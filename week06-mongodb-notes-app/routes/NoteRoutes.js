const noteModel = require('../models/NotesModel.js');
const express = require('express');
const { findById } = require('../models/NotesModel.js');
const  routes = express.Router();
const app =express.Router();

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
//app.post('/notes', async (req, res) => {
routes.post('/notes', async (req, res) => {
        // Validate request
    // console.log(req.body.content)
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to save the note

    const newNote = new noteModel(req.body)
    try {
        await newNote.save()
        res.status(201).send(newNote)
    } catch (e) {
        res.status(400).send(e.message)
    }
                                                                                                                         



});

//TODO - Retrieve all Notes

routes.get("/notes",(req, res)=>{
    noteModel.find().then((Notes)=>{
        res.send(Notes)
    }).catch((err)=>{
        res.status(500).send({message: err.message})
    })
});

//http://mongoosejs.com/docs/api.html#find_find
//TODO - Retrieve a single Note with noteId
routes.get('/notes/:notesId', async(req, res)=>{
    const id = req.params.notesId
    console.log(id)
    try{
        const note = await noteModel.findById(id)
        res.status(200).send(note)

    }catch(e){
        res.status(400).send(`cannot find the id`)

    }
})


//http://mongoosejs.com/docs/api.html#findbyid_findById
//app.get('/notes/:noteId', (req, res) => {
routes.get('/notes/:noteId', (req, res) => {  
      // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to return onlt one note using noteid
    const id = req.params.noteId
    try{
        const note = noteModel.findById(id)
        res.status(200).send("note")

    }catch(e){
        res.status(400).send(`Cannot find note Id ${id}`)

    }


});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
//app.put('/notes/:noteId', (req, res) => {
    
 routes.put('/notes/:noteId', async (req, res) => { 
      // Validate request
      const body = req.body
    if (Object.keys(body).length === 0) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to update the note using noteid
    try {
        const updatedNote = await noteModel.findByIdAndUpdate(req.params.noteId, body)
        const note = await updatedNote.save()
        res.status(202).send("message: Note is updated")
    } catch (e) {
        res.status(400).send(e.message)
    }
});



//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
//app.delete('/notes/:noteId', (req, res) => {
routes.delete('/notes/:noteId', (req, res) => {  
      // Validate request

    try{
        const deleteNote = noteModel.findByIdAndDelete(req.params.noteId)
        if(!deleteNote){
            res.status().send("Item not found")
        }
        res.status(200).send("Note deleted")
        
    }catch(e){
        res.status().send(e.message)

    }
});

module.exports = routes