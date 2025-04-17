const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  city: { type: String, required: true },
  district: { type: String, required: true }, 
  longitude: { type: mongoose.Types.Decimal128, required: true },
  latitude: { type: mongoose.Types.Decimal128, required: true },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' }
});
 
const Location = mongoose.model('Location', locationSchema);

module.exports = Location;