const router=require("express").Router();
const mongoose=require("mongoose");
const {User}=require("../models/user");
const joi = require("joi");
const bcrypt = require("bcrypt");
const {registerValidationSchema,loginValidationSchema} = require("../models/validate");
const saltRounds=10;

router.post("/login", async (req,res) => {

    const {error} = loginValidationSchema.validate(req.body);
    if(error)
    {
       res.status(400).send(error.details[0].message);
       return;
    }

    const user = await User.findOne({email: req.body.email});
    if(!user)
    {
       res.status(400).send("User doesn't exist.");
       return;
    }
    
    const result = await bcrypt.compare(req.body.password,user.password);
    if(!result)
    {
        res.status(400).send("Invalid Password");
        return;
    }

    res.status(200).send(user._id);

});

router.post("/register",async (req,res) => {

    const {error} = await registerValidationSchema.validate(req.body);
    if(error)
    {
       res.status(400).send(error.details[0].message);
       return;
    }

    const exist = await User.findOne({email: req.body.email});
    if(exist)
    {
       res.status(400).send("Email already exists.");
       return;
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const newUser = new User({
        email:req.body.email,
        username:req.body.username,
        password:hashedPassword
    });
    try{
        const user = await newUser.save();
        res.status(200).json(user._id);
    }
    catch(err){
        res.status(404).json({message:err});
    }
});



module.exports = router; 