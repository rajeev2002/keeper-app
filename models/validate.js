const joi = require("joi");

const registerValidationSchema = joi.object({
    
    username: joi.string()
    .min(6)
    .required(),

    email: joi.string()
    .min(6)
    .required()
    .email(),

    password: joi.string()
    .min(6)
    .required()
});

const loginValidationSchema = joi.object({
   
    email: joi.string()
    .min(6)
    .required()
    .email(),

    password: joi.string()
    .min(6)
    .required()
});

module.exports = {registerValidationSchema,loginValidationSchema};