const mongoose = require('mongoose');

const businessLocationSchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  active: { type: Boolean, default: true }, // Is the business currently active in this location?
  createdAt: { type: Date, default: Date.now }
});
 
const BusinessLocation =  mongoose.model('BusinessLocation', businessLocationSchema);

module.exports = { BusinessLocation };