const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
const csurf = require("csurf");
const s3 = require("./s3");
const { s3Url } = require("./config.json");

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

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

// app.use(
//     cookieSession({
//         secret: cookieSecret,
//         maxAge: 1000 * 60 * 60 * 24 * 14,
//     })
// );

// const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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
                        success: false,
                    });
                });
        })
        .catch((error) => {
            console.log("You are not insane", error);
            res.status(500).json({
                error: "Error in logging in.",
                success: false,
            });
        });
});

//user first enters email in 1st display
//getUser, then insertCode
app.post("/password/reset/start", (req, res) => {
    console.log("POST request password/reset/start");
    db.getUser(req.body.email).then((result) => {
        console.log("result in password/reset/start getUser is ", result);
        console.log("result.rows: ", result.rows);
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
                            // success: false,
                        });
                    }
                })
                .catch((error) => {
                    console.log(
                        "Error caught in password reset start post route: ",
                        error
                    );
                    res.status(500).json({ error: "Error!" });
                    // success: false,
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
                                success: false,
                            });
                        });
                });
            } else {
                console.log("Check!");
                res.status(500).json({
                    error: "Invalid E-Mail",
                    success: false,
                });
            }
        })
        .catch((error) => {
            console.log("Error caught in checkVerification: ", error);
            res.status(500).json({
                error: "Error resetting password.",
                success: false,
            });
        });
});

//profile pic upload
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
                    success: false,
                });
            });
    }
});

//get user
app.get("/user", (req, res) => {
    // console.log("GET request made to /user.");
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

//update bio
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

//other profiles
//cannot be /user/:id!!
app.get("/other-user/:id", (req, res) => {
    console.log("GET request made to other-user/:id");
    const { id } = req.params;
    const { userId } = req.session;
    console.log("id in other-user GET: ", id);
    console.log("userId in other-user GET: ", userId);
    if (parseInt(id) === userId) {
        res.json({
            error: "UserId and Id are identical!",
            success: false,
        });
    } else {
        db.getOtherUser(id)
            .then((result) => {
                // console.log("result getOtherUser: ", result);
                if (result.rows.length === 0) {
                    res.json({
                        error: "Error in retrieving users.",
                    });
                } else {
                    res.json(result.rows[0]);
                }
            })
            .catch((error) => {
                console.log("Error in GET /other-user/:id", error);
                res.json({
                    success: false,
                });
            });
    }
});

//search bar
app.get("/find/users/:inputField", (req, res) => {
    console.log("GET request made to find/users/:id.");
    const { inputField } = req.params;
    db.searchForUserInformation(inputField)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((error) => {
            console.log("Error caught in /find/users/:id: ", error);
        });
});

// newest users!
app.get("/find/users.json", (req, res) => {
    console.log("GET request made to /find/users.");
    db.getNewestUsers()
        .then((result) => {
            console.log("result.rows: ", result.rows);
            res.json(result.rows);
        })
        .catch((error) => {
            console.log("Error in GET /find/users", error);
            // res.json({
            //     success: false,
            // });
        });
});

//map route
app.get("/map", (req, res) => {
    console.log("GET request to map page was made.");
    res.send("/map");
});

app.post("/map", (req, res) => {
    console.log("POST request was made to map page.");
    res.render("/map");
});

//friend requests
app.get("/connection/:viewedUser", async (req, res) => {
    const loggedInUser = req.session.userId;
    console.log("loggedinUser in friendship GET route: ", req.session.userId);
    const { viewedUser } = req.params;
    console.log("req.params: ", req.params);
    const { rows } = await db.connection(loggedInUser, viewedUser);

    if (rows.length === 0) {
        return res.status(200).json({
            dynamicButtonText: "Add friend",
        });
    }
    if (rows[0].accepted) {
        return res.status(200).json({
            dynamicButtonText: "Unfriend",
        });
    }
    if (!rows[0].accepted) {
        if (rows[0].recipient_id === loggedInUser) {
            return res.status(200).json({
                dynamicButtonText: "Accept",
            });
        } else {
            return res.status(200).json({
                dynamicButtonText: "Cancel friend request",
            });
        }
    }
});

app.post("/connection", async (req, res) => {
    const loggedInUser = req.session.userId;
    console.log("req.session.userId: ", req.session.userId);
    const { dynamicButtonText, viewedUser } = req.body;
    console.log("loggedInuser : ", req.session.userId);
    console.log("req.body: ", req.body);

    try {
        if (dynamicButtonText === "Add friend") {
            await db.beFriend(loggedInUser, viewedUser);
            return res.json({
                dynamicButtonText: "Cancel request",
            });
        }
        if (dynamicButtonText === "Accept") {
            await db.updateConnection(loggedInUser, viewedUser);
            return res.json({
                dynamicButtonText: "Unfriend",
            });
        }
        if (
            dynamicButtonText === "Cancel request" ||
            dynamicButtonText === "Unfriend" ||
            dynamicButtonText === "Decline request"
        ) {
            await db.unFriend(loggedInUser, viewedUser);
            return req.json({
                dynamicButtonText: "Add friend",
            });
        }
    } catch (error) {
        console.log("Error in app.post /friendship route: ", error);
        return res.json({
            error: "Error caught in /connection POST.",
        });
    }
});

app.get("/friendrequests.json", async (req, res) => {
    const { userId } = req.session;
    try {
        const { rows } = await db.retrieveFriendsAndWannabees(userId);
        res.json(rows);
    } catch (error) {
        console.log("Error caught in friendrequests GET route: ", error);
    }
});

// logout
app.get("/logout", (req, res) => {
    console.log("logout route requested.");
    req.session = null;
    res.redirect("/welcome");
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
server.listen(process.env.PORT || 3001, function () {
    console.log("Zuckerberg is listening.");
});

//sockets will work for users only if they are logged in, otherwise they are disconnected
io.on("connection", function (socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;
    console.log("userId in sockets: ", userId);

    (async () => {
        try {
            const { rows } = await db.retrieveLatestMessages();
            io.sockets.emit("chatMessages", rows.reverse());
        } catch (error) {
            console.log("Error caught db.retrieveLastMessages:", error);
        }
    })();

    socket.on("chatMessage", async (msg) => {
        const message = msg;
        console.log("message from chat.js:", message);

        try {
            const result = await db.addChatMessage(message, userId);
            const { rows } = await db.getUserInfo(userId);
            console.log("rows in chat socket: ", rows);
            const chatData = {
                sender_id: rows[0].id,
                first_name: rows[0].first_name,
                last_name: rows[0].last_name,
                img_url: rows[0].img_url,
                message: result.rows[0].message,
                created_at: result.rows[0].created_at,
            };
            console.log("chatInfo from chat.js:", chatData);
            io.sockets.emit("chatMessage", chatData);
        } catch (error) {
            console.log("Error caught inserting message from chat.js:", error);
        }
    });
});
