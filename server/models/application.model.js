const mongoose = require('mongoose');  

const applicationServiceSchema = new mongoose.Schema({
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }, 
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }, 
  paymentStatus: { type: Boolean, default: false},
  appliedAt: { type: Date, default: Date.now }
});

const Application =  mongoose.model('Application Service', applicationServiceSchema);

module.exports = Application;
