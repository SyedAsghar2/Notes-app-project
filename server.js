const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json()); // parse JSON
app.use(express.static('public')); // serve your frontend

const DATA_FILE = path.join(__dirname, 'data', 'notes.json');

// Load notes
app.get('/notes', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Server Error');
    res.json(JSON.parse(data));
  });
});

// Save new note
app.post('/notes', (req, res) => {
  const newNote = req.body;

  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Server Error');
    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(DATA_FILE, JSON.stringify(notes), (err) => {
      if (err) return res.status(500).send('Could not save note');
      res.status(201).json(newNote);
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
