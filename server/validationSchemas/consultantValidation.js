const Joi = require('joi');

const updateConsultantSchema = Joi.object({
  salary: Joi.number().strict().required(),
  bonus: Joi.number().strict().required(),
  qualificationsIds: Joi.array().items(Joi.string()).min(1).required(),
  experienceYears: Joi.number().min(0).required(),
});
 
module.exports = { updateConsultantSchema };
