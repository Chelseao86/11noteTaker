const express = require('express');
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const app = express()
const { v4: uuidv4 } = require('uuid');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/notes", (req,res)=>{
  const db = fs.readFileSync(path.join(__dirname, "./db/db.json"),"utf-8")
const data = JSON.parse(db)
const newNote = req.body
newNote.id = uuidv4()
data.push(newNote)
fs.writeFileSync(path.join(__dirname, "./db/db.json"),
JSON.stringify(data)
)
res.json(data)
})

app.get("/api/notes", (req, res)=>{
  const db = fs.readFileSync(path.join(__dirname, "./db/db.json"),"utf-8")
const data = JSON.parse(db)
res.json(data)
})

app.get("/notes",(req, res)=>{
  res.sendFile(path.join(__dirname, "./public/notes.html"))
  })
app.get("*",(req, res)=>{
res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.listen(process.env.PORT, ()=> {
console.log("started server")
console.log(process.env.PORT)
}
  )