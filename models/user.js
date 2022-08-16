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
    },
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    notes:[noteSchema]
});

const User = mongoose.model("User",userSchema);
const Note = mongoose.model("Note",noteSchema);

module.exports = {User,Note};
