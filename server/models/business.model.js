const mongoose = require('mongoose');
 
const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, 
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' }, 
  competitionScore: { type: Number , required: true},
  employees: { type: Number, required: true }, 
  operatingHoursPerDay: { type: Number, required: true },
  workingDaysPerMonth: { type: Number, required: true },
  serviceProductAvgPrice: { type: mongoose.Types.Decimal128, required: true },
  expectedCustomersPerDay: { type: mongoose.Types.Decimal128, required: true },
  createdAt: { type: Date, default: Date.now }
});
  
const Business =  mongoose.model('Business', businessSchema);

module.exports = Business ;
