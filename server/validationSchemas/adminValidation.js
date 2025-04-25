const Joi = require('joi');

const fullName = Joi.string().min(3).required();
const email = Joi.string().email().required();
const password = Joi.string().min(6).required();
const phoneNumber = Joi.string().pattern(/^\d{10,15}$/).required();

const adminCreateConsultantSchema = Joi.object({ 
    salary: Joi.number().strict().required(), 
    bonus: Joi.number().strict().required(), 
    qualificationsIds: Joi.array().items(Joi.string().length(24)).min(1).required(),
    experienceYears: Joi.number().integer().min(0).strict().required(), 
    fullName,
    email,
    password,
    phoneNumber,
});

const createAdminSchema = Joi.object({ 
    fullName,
    email,
    password,
    phoneNumber,
});
 
module.exports = {
    adminCreateConsultantSchema, 
    createAdminSchema,
    fullName,
    email,
    password,
    phoneNumber,
  };