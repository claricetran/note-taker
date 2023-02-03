const express = require("express");

const { v4: uuidv4 } = require("uuid");
const { readFromFile, readAndAppend, writeToFile } = require("../helper/fsUtil");

const app = express();

// GET route for retreiving all of the notes
app.get("/notes", (req, res) => {
	readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST route for a creating a new note.
app.post("/notes", (req, res) => {
	const { title, text } = req.body;
	const newNote = {
		id: uuidv4(),
		title,
		text,
	};
	readAndAppend(newNote, "./db/db.json");
	res.json("Note added.");
});

app.delete("/notes/:id", (req, res) => {
	const id = req.params.id;
	readFromFile("./db/db.json")
		.then((data) => JSON.parse(data))
		.then((json) => {
			const result = json.filter((note) => note.id !== id);
			writeToFile("./db/db.json", result);
			res.json(`Note ${id} has been deleted.`);
		});
});
module.exports = app;
