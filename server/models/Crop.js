const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  variety: { type: String, required: true },
  plantingDate: { type: Date, required: true },
  harvestDate: { type: Date },
  area: { type: Number, required: true }, // in acres
  expectedYield: { type: Number }, // in kg
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['planted', 'growing', 'harvested'], default: 'planted' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Crop', cropSchema);