const express = require("express");
const app = express();
const compression = require("compression");
// const path = require("path");
const db = require("./db");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
const csurf = require("csurf");
const s3 = require("./s3");
const { s3Url } = require("./config.json");

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const { hash, compare } = require("../bc");
const cookieSession = require("cookie-session");
let cookieSecret;
if (process.env.COOKIE_SECRET) {
    cookieSecret = process.env.COOKIE_SECRET;
} else {
    cookieSecret = require("../secrets.json").COOKIE_SECRET;
}

app.use(
    cookieSession({
        secret: cookieSecret,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(csurf());
app.use(function (req, res, next) {
    res.setHeader("x-frame-options", "deny");
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// always use compression in every project!
// this will compress/minimize size of response that we send
app.use(compression());

// serving our public directory
app.use(express.static(path.join(__dirname, "..", "client", "public")));

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

//Welcome route
app.get("/welcome", (req, res) => {
    // console.log("welcome");
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

// app.post("/welcome", function (req, res) => {
//     console.log("POST request was made to welcome route.");
//     const {firstName, lastName, email, password}
// })

//Registration route
app.post("/registration", (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);
    hash(password).then((hashedPassword) => {
        console.log(hashedPassword);
        db.addUser(firstName, lastName, email, hashedPassword)
            .then(({ rows }) => {
                const { id } = rows[0];
                req.session.userId = id;
                res.json({ success: true });
            })
            .catch((error) => {
                console.log("Error thrown in registration POST route: ", error);
                res.json({ success: false });
            });
    });
});

app.post("/login", (req, res) => {
    console.log("POST request to /login was made.");
    const { email, password } = req.body;
    console.log("req.body in login POST route is: ", req.body);
    db.getUser(email)
        .then((result) => {
            console.log("result.rows: ", result.rows);
            compare(password, result.rows[0].password_hash)
                .then((match) => {
                    if (match) {
                        req.session.userId = result.rows[0].id;
                        res.json({
                            success: true,
                        });
                    } else {
                        console.log(
                            "error thrown in compare in login post route!"
                        );
                        res.status(500).json({
                            success: false,
                        });
                    }
                })
                .catch((error) => {
                    console.log("Error in POST route of login: ", error);
                    res.status(500).json({
                        error: "Error logging in!",
                    });
                });
        })
        .catch((error) => {
            console.log("You are not insane", error);
            res.status(500).json({
                error: "Error in logging in.",
            });
        });
});

//user first enters email in 1st display
//getUser, then insertCode
app.post("/password/reset/start", (req, res) => {
    console.log("POST request password/reset/start");
    db.getUser(req.body.email).then((result) => {
        console.log("result in password/reset/start getUser is ", result);
        if (result.rows.length > 0) {
            const secretCode = cryptoRandomString({
                length: 6,
            });
            const email = result.rows[0].email;
            db.insertCode(secretCode, email)
                .then(({ rows }) => {
                    if (rows.length > 0) {
                        sendEmail(
                            rows[0].email,
                            `Hey there! Your verification code to reset your password is: ${rows[0].code}`,
                            "Your verification code"
                        );
                        res.status(200).json({
                            success: "Verification success!",
                        });
                    } else {
                        res.status(500).json({
                            error: "Error caught in verification.",
                        });
                    }
                })
                .catch((error) => {
                    console.log(
                        "Error caught in password reset start post route: ",
                        error
                    );
                    res.status(500).json({ error: "Error!" });
                });
        }
    });
});

//user enters new code and new password
//checkVerification, then updatePassword
app.post("/password/reset/verify", (req, res) => {
    console.log("POST request password/reset/verify");
    const { email, password, code } = req.body;
    console.log("req.body in verify post route is: ", req.body);
    db.checkVerificationCode(email)
        .then((result) => {
            if (result.rows[0].code === code) {
                hash(password).then((hashedPassword) => {
                    db.updatePassword(hashedPassword, email)
                        .then(() => {
                            res.status(200).json({
                                success: "Password update successful.",
                            });
                        })
                        .catch((error) => {
                            console.log(
                                "Error caught in verification POST route: ",
                                error
                            );
                            res.status(500).json({
                                error: "Error verifying password.",
                            });
                        });
                });
            } else {
                console.log("Check!");
                res.status(500).json({
                    error: "Invalid E-Mail",
                });
            }
        })
        .catch((error) => {
            console.log("Error caught in checkVerification: ", error);
            res.status(500).json({
                error: "Error resetting password.",
            });
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("POST route to /upload");
    console.log("req.body", req.body);
    if (req.file) {
        const { filename } = req.file;
        const fullUrl = s3Url + filename;
        console.log("req.session", req.session);
        const { userId } = req.session;
        db.uploadProfilePic(fullUrl, userId)
            .then((result) => {
                console.log("result.rows: ", result.rows);
                res.json(result.rows[0]);
            })
            .catch((err) => {
                console.log("Error in POST /upload", err);
                res.status(500).json({
                    error: "Error caught in /upload POST route.",
                });
            });
    }
});

app.get("/user", (req, res) => {
    console.log("GET request made to /user.");
    db.getUserInfo(req.session.userId)
        .then((result) => {
            res.json(result.rows[0]);
        })
        .catch((error) => {
            console.log("Error caught in GET route to /user: ", error);
            res.json({
                success: false,
            });
        });
});

//db.setBio
app.post("/updatebio", (req, res) => {
    console.log("POST request made to /updatebio");
    db.setBio(req.body.bio, req.session.userId)
        .then((result) => {
            console.log("result.rows[0] in /updatebio: ", result.rows[0]);
            res.json(result.rows[0]);
        })
        .catch((error) => {
            console.log("Error caught in /updatebio POST route: ", error);
            res.json({
                success: false,
            });
        });
});

// sending HTML file back as response to browser - VERY IMPORTANT FOR THINGS TO WORK...
// never delete or comment this route out ever!
app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

// no specific reason why we switched port to 3001....
app.listen(process.env.PORT || 3001, function () {
    console.log("Zuckerberg is listening.");
});
