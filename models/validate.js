const joi = require("joi");

const registerValidationSchema = joi.object({
  id: joi.string(),

  username: joi.string().min(6).required(),

  email: joi.string().min(6).required().email(),

  password: joi.string().min(6).required(),
});

const loginValidationSchema = joi.object({
  id: joi.string(),

  email: joi.string().min(6).required().email(),

  password: joi.string().min(6).required(),
});

module.exports = { registerValidationSchema, loginValidationSchema };
