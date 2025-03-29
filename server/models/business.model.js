const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, 
  locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }], 
  competiotionScore: { type: Number },
  createdAt: { type: Date, default: Date.now }
});
  
const Business =  mongoose.model('Business', businessSchema);

module.exports = Business ;
