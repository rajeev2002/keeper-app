const mongoose = require("mongoose"),
Schema=mongoose.Schema;

const noteSchema = mongoose.Schema({
    title:{
        type:String,
    },
    note:{
        type:String,
    }
});

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    notes:[noteSchema]
});

const User = mongoose.model("User",userSchema);
const Note = mongoose.model("Note",noteSchema);

module.exports = {User,Note};
