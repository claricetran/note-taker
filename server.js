const express = require("express");
const path = require("path");
const { clog } = require("./middleware/clog.js");
const api = require("./routes/index.js");

const PORT = process.env.PORT || 3000;

const app = express();

// middleware clog
app.use(clog);

//middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static("public"));

// GET route for notes page
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));

// GET route where wildcard will redirect to homepage
app.get("/*", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));

app.listen(PORT, () => console.log(`App listening at ${PORT}`));
