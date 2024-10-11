const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated

const noteSchema = new mongoose.Schema({
    
    
    notetitle:{
        type:String,
       
        
    },
    notedescription:{
        type:String,
        
    },
    priority:{
        type: String,
        enum: ["High", "Medium", "low"]


    },
    dateAdded:{
        type:Date

    },
    dateUpdated:{
        type:Date

    }
});

const Note = mongoose.model('note', noteSchema)
module.exports = Note;