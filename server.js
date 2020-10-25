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
app.use(express.static("public"));

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
        return res.json(JSON.parse(data));
});

// If no matching route is found, return false
app.get("*", function (req, res) {
    var currentNote = req.params.notesArray;

    for (var i = 0; i < notesArray.length; i++) {
      if (currentNote === notesArray[i].routeName) {
        return res.json(notesArray[i]);
      }
    }
  
    return res.json(false);
  });

// Create new notes - takes in JSON input
app.post("/api/notes", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newNote = req.body;
  notesArray.push(newNote);
  res.json(newNote);
});

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