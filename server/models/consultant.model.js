const mongoose = require('mongoose');
const { Decimal128 } = mongoose.Types;

const consultantSchema = new mongoose.Schema({
  salary: { type: Decimal128, required: true },
  bonus: { type: Decimal128, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  servicesIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  qualificationsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Qualification' }],
  experienceYears: { type: Number },
}); 
 
const Consultant = mongoose.model('Consultant', consultantSchema);

module.exports = Consultant;
