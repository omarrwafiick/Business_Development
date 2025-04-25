const Joi = require('joi');

 const createBusinessSchema = Joi.object({
  name: Joi.string().min(3).required(),  
  description: Joi.string().min(10).required(),  
  ownerId: Joi.string().length(24).required(),  
  categoryId: Joi.string().length(24).required(), 
});

module.exports = { createBusinessSchema };