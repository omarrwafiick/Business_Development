const Joi = require('joi');
const { fullName, email, password, phoneNumber,} = require('./adminValidation');
 
const registerSchema = Joi.object({ 
    fullName,
    email,
    password,
    phoneNumber,
    role: Joi.string().required()
});

const loginSchema = Joi.object({  
    email,
    password, 
});
 
const forgetPasswordSchema = Joi.object({  
    email
});

const resetPasswordSchema = Joi.object({  
    password
});

const contactSchema = Joi.object({  
    message: Joi.string().min(1).required(),  
    subject: Joi.string().min(3).required(),
});
 
module.exports = { registerSchema, loginSchema,forgetPasswordSchema, resetPasswordSchema, contactSchema };