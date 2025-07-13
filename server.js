import express from "express";
import bodyParser from "body-parser";
import expressLayouts from 'express-ejs-layouts';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

//Static Files
app.use(express.static("public"));

//Set Templating Engine
app.use(expressLayouts)
app.set('views', './views')
app.set('layout', 'index.ejs') //express-ejs-layouts automaticly looks for a file called "layout.ejs" for the layout. This is to set the layout to our own ejs file
app.set('view engine', 'ejs')

//Saved Notes Data
const allNotes = [
    // {
    //     id:1,
    //     title:"My first note title",
    //     content:"The content of my first note"
    // },
    // {
    //     id:2,
    //     title:"My second note title",
    //     content:"The content of my second note"
    // },
    // {
    //     id:3,
    //     title:"My third note title",
    //     content:"The content of my third note"
    // },
    // {
    //     id:4,
    //     title:"My fourth note title",
    //     content:"The content of my fourth note"
    // },
    // {
    //     id:5,
    //     title:"My fifth note title",
    //     content:"The content of my fifth note"
    // },
    // {
    //     id:6,
    //     title:"My sixth note title",
    //     content:"The content of my sixth note"
    // }
]

const startingNote = {
    id:0,
    title:"",
    content:""
}



//Navigation
app.get('/', (req, res) => {
   startingNote.id = allNotes.length > 0 ? allNotes.at(-1).id + 1 : 1
   const note = startingNote
   console.log(note)
    res.render("index.ejs", {allNotes, note});
})

app.get('/notes', (req, res) => {
    res.json(allNotes);
})



// app.get('/:id', (req, res) => {
//   const id = req.params.id
//   const note = allNotes.find(note => note.id == id)
//   res.render("index.ejs", {allNotes, note})
// })


app.get('/:id', (req, res) => {
    const id = req.params.id
    const note = allNotes.find(note => note.id == id)
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note)
})

app.post('/', (req, res) => {
    const data = req.body
    console.log(data)
    data.id = allNotes.length > 0 ? allNotes.at(-1).id + 1 : 1
    allNotes.push(data)
    res.json({
        status:"success",
         title: data.title,
         body: data.content,
         id: data.id
     })
    
 })

 app.patch('/', (req, res) => {
    const data = req.body;
    const noteIndex = allNotes.findIndex(note => note.id === data.id);
    
    if (noteIndex === -1) {
        console.log(id)
        return res.status(404).json({ error: 'Note not found' });
    }
    
    // Update only the provided fields
    if (req.body.title) allNotes[noteIndex].title = req.body.title;
    if (req.body.content) allNotes[noteIndex].content = req.body.content;
    
    res.json(allNotes[noteIndex]);
});


app.delete("/delete", (req,res) => {
    const data = req.body;
    console.log("DELETE request data:", data.id);
    const noteIndex = allNotes.findIndex(note => note.id == data.id);
    if (noteIndex == -1) return res.status(404).json({ error: 'Note not found' });
    allNotes.splice(noteIndex, 1);
    res.json({ success: true});
 })


// app.delete("/delete", (req, res) => {
//     console.log(req.body)
//     res.json({
//         status:"success"
//     })
// })



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});