const mongoose =require("mongoose");
const express = require("express");
const router = express.Router();
const {User,Note}=require("../models/user")

router.get("/",async (req,res) => {

    const id=req.query.id;

    try{
        const userData = await User.findOne({_id: id});
        res.status(200).json(userData.notes);
    }
    catch(err){
        res.status(404).json({message:err})
    }
});

router.post("/add",async (req,res) => {

    const newNote=new Note({
        title:req.body.title,
        note:req.body.body
    });

    try{
        const query = {_id: req.body.id};
        const user = await User.findOneAndUpdate(query,{$push: {notes: newNote}});
        res.status(200).send("success");
    }
    catch(err){
        res.status(404).json({message: err});
    }
});

router.post("/delete",async (req,res) => {

    try{
        const result = await User.findOneAndUpdate({_id: req.body.userId},{$pull: {notes: {_id: req.body.noteId}}});
        res.status(200).send("success");
    }
    catch(err){
        res.status(404).send({message:err});
    } 
});

module.exports = router;
