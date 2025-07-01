const mongoose = require('mongoose');  

const consultantSchema = new mongoose.Schema({ 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  qualificationsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Qualification' }],
  experienceYears: { type: Number },
});  
 
const Consultant = mongoose.model('Consultant', consultantSchema);

module.exports = Consultant;
 