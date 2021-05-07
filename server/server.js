const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

// always use compression in every project!
// this will compress/minimize size of response that we send
app.use(compression());

// serving our public directory
app.use(express.static(path.join(__dirname, "..", "client", "public")));

// sending HTML file back as response to browser - VERY IMPORTANT FOR THINGS TO WORK...
// never delete or comment this route out ever!
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// no specific reason why we switched port to 3001....
app.listen(process.env.PORT || 3001, function () {
    console.log("Zuckerberg is listening.");
});
