const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const Crop = require('../models/Crop');
const Scheme = require('../models/Scheme');
const MarketPrice = require('../models/MarketPrice');
const User = require('../models/User');

// All farmer routes require authentication and farmer role
router.use(authenticate);
router.use(authorize('farmer'));

// Get farmer dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    const crops = await Crop.find({ farmer: req.user._id });
    const schemes = await Scheme.find({ isActive: true });
    const marketPrices = await MarketPrice.find().sort({ date: -1 }).limit(10);
    
    res.json({
      crops: crops.length,
      activeCrops: crops.filter(crop => crop.status !== 'harvested').length,
      schemes: schemes.length,
      latestPrices: marketPrices
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crop management routes
// Get all crops for the farmer
router.get('/crops', async (req, res) => {
  try {
    const crops = await Crop.find({ farmer: req.user._id });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new crop
router.post('/crops', async (req, res) => {
  try {
    const crop = new Crop({
      ...req.body,
      farmer: req.user._id
    });
    const savedCrop = await crop.save();
    res.status(201).json(savedCrop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a crop
router.put('/crops/:id', async (req, res) => {
  try {
    const crop = await Crop.findOne({ _id: req.params.id, farmer: req.user._id });
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    
    Object.assign(crop, req.body);
    const updatedCrop = await crop.save();
    res.json(updatedCrop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a crop
router.delete('/crops/:id', async (req, res) => {
  try {
    const crop = await Crop.findOne({ _id: req.params.id, farmer: req.user._id });
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    
    await crop.remove();
    res.json({ message: 'Crop deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all active schemes
router.get('/schemes', async (req, res) => {
  try {
    const schemes = await Scheme.find({ isActive: true });
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all market prices
router.get('/prices', async (req, res) => {
  try {
    const prices = await MarketPrice.find().sort({ date: -1 });
    res.json(prices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get farmer profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;