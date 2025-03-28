const mongoose = require('mongoose');
const { Decimal128 } = mongoose.Types;

const consultantSchema = new mongoose.Schema({
  salary: { type: Decimal128, required: true },
  bonus: { type: Decimal128, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  qualifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Qualification' }],
  experienceYears: { type: Number },
});
 
const Consultant = mongoose.model('Consultant', consultantSchema);

module.exports = Consultant;
