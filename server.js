//Class activity 11.13, star wars, provided a lot of this code
//Code was tweaked for not taking oppose to characters
//Import dependencies (require these modules)
// Dependencies
// =============================================================
const express = require('express');
const path = require('path');
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname,"public"));

//Empty array for the notes or Data
// =============================================================
const notesArray = [];


// Routes
// =============================================================
// Basic route that sends the user first to the AJAX home page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Displays all notes
app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
        res.json(JSON.parse(data));
    })
});

// Create New Characters - takes in JSON input
app.post("/api/notes", function (req, res) {
    var title = req.body.title;
    var text = req.body.text;
    var newNote = { title, text, id: uuidv1() }
    var pastNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
   //Add the json the user sent to the notes array
    pastNotes.push(newNote)

    fs.writeFileSync("db/db.json", JSON.stringify(pastNotes));
    //Display the JSON to the users
    res.json(newNote);
})

// API delete route
app.delete("/api/notes/:id", function (req, res) {
    var pastNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    var updateNotes = pastNotes.filter(function (note) {
        return note.id !== req.params.id
    })
    fs.writeFileSync("db/db.json", JSON.stringify(updateNotes));
    res.json({ ok: true })
})


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});