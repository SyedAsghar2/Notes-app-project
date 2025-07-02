import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))


//Static Files
app.use(express.static("public"));
app.use('/css', express.static(__dirname + 'public/css'))


//Set Templating Engine
app.set('views', './views')
app.set('view engine', 'ejs')


//Navigation
app.get('/', (req, res) => {
  res.render("index")
})


app.post("/submit", (req, res) => {
    console.log("Received data:", req.body);
    res.send("Data received!")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});