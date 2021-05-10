const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
// const csurf = require("csurf");

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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// always use compression in every project!
// this will compress/minimize size of response that we send
app.use(compression());

// serving our public directory
app.use(express.static(path.join(__dirname, "..", "client", "public")));

//Welcome route
app.get("/welcome", function (req, res) {
    console.log("welcome");
    // if (req.session.userId) {
    //     res.redirect("/");
    // } else {
    // }
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

//Registration route
app.post("/registration", (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);
    hash(password).then((hashedPassword) => {
        console.log(hashedPassword);
        db.addUser(firstName, lastName, email, hashedPassword)
            .then((result) => {
                const { id } = result.rows[0];
                req.session.userId = id;
                res.json(result);
            })
            .catch(
                (err) =>
                    console.log(
                        "Error thrown in registration POST route: ",
                        err
                    ),
                res.json({
                    success: false,
                })
            );
    });
});

// sending HTML file back as response to browser - VERY IMPORTANT FOR THINGS TO WORK...
// never delete or comment this route out ever!
app.get("*", function (req, res) {
    // if (!req.session.userId) {
    //     res.redirect("/welcome");
    // } else {
    // }
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// no specific reason why we switched port to 3001....
app.listen(process.env.PORT || 3001, function () {
    console.log("Zuckerberg is listening.");
});
