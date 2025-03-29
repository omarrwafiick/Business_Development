const mongoose = require('mongoose');

const consultantServiceSchema = new mongoose.Schema({
  consultant: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultant', required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },  
  createdAt: { type: Date, default: Date.now }
});
   
const ConsultantService = mongoose.model('ConsultantService', consultantServiceSchema);

module.exports = ConsultantService;