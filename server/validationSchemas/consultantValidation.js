const Joi = require('joi');

const updateConsultantSchema = Joi.object({ 
  qualificationsIds: Joi.array().items(Joi.string()).min(1).required(),
  experienceYears: Joi.number().min(0).required(),
});
 
module.exports = { updateConsultantSchema };
