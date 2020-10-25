//Class activity 11.13, star wars, provided started code
//Code was tweaked for note-taking oppose to characters

// Dependencies. Import dependencies (require these modules)
// =============================================================
//fs introduced in 11.4
const fs = require("fs");
const express = require("express");
const path = require("path");
//tutor helped with uuid
const { v4: uuidv4 } = require('uuid');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Empty array for the notes or Data
// =============================================================
let noteArr= [];


// Routes
// =============================================================
// Basic route that sends the user first to the AJAX home page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// route for notes page
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Displays all notes
app.get("/api/notes", function (req, res) {
  fs.readFile("db.json", "utf8", function (err, data) {
    res.json(JSON.parse(data));
  })
});

// Create new notes - takes in JSON input
app.post("/api/notes", function (req, res) {
  const title = req.body.title;
  const text = req.body.text;
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newNote = { title, text, id: uuidv4() }
  const pastNotes = JSON.parse(fs.readFileSync("db.json", "utf8"));
  pastNotes.push(newNote)
  fs.writeFileSync("db.json", JSON.stringify(pastNotes));
  res.json(newNote);
})

// API delete route. Tutor help.
app.delete("/api/notes/:id", function (req, res) {
  const pastNotes = JSON.parse(fs.readFileSync("db.json", "utf8"));
  const updateNotes = pastNotes.filter(function(note){
    return note.id !== req.params.id
  })
  fs.writeFileSync("db.json", JSON.stringify(updateNotes));
  res.json({ok: true})
})


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});