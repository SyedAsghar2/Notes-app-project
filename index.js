import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

const notesFile = __dirname + "/notes.json";


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css"));


app.set("views", "./views");
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  let notes = [];
  try {
    notes = JSON.parse(fs.readFileSync(notesFile));
  } catch (err) {
    console.error("Couldn't read notes.json:", err);
  }
  res.render("index", { notes });
});


app.post("/submit", (req, res) => {
  const { "note-title": title, "note-body": body } = req.body;

  if (!title && !body) {
    return res.status(400).send("Note is empty.");
  }

  let notes = [];
  try {
    notes = JSON.parse(fs.readFileSync(notesFile));
  } catch (err) {
    console.error("Couldn't read notes.json:", err);
  }

  notes.push({ id: Date.now(), title, body });

  fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
  res.redirect("/");
});


app.post("/delete", (req, res) => {
  const { noteId } = req.body;

  let notes = [];
  try {
    notes = JSON.parse(fs.readFileSync(notesFile));
  } catch (err) {
    console.error("Couldn't read notes.json:", err);
  }

  const updatedNotes = notes.filter((n) => n.id !== parseInt(noteId));
  fs.writeFileSync(notesFile, JSON.stringify(updatedNotes, null, 2));

  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
