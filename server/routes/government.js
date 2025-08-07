const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const Crop = require('../models/Crop');
const Scheme = require('../models/Scheme');
const MarketPrice = require('../models/MarketPrice');
const User = require('../models/User');

// All government routes require authentication and government role
router.use(authenticate);
router.use(authorize('government'));

// Get government dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    const farmers = await User.countDocuments({ role: 'farmer' });
    const crops = await Crop.countDocuments();
    const schemes = await Scheme.countDocuments();
    const marketPrices = await MarketPrice.countDocuments();
    
    res.json({
      farmers,
      crops,
      schemes,
      marketPrices
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Farmer management routes
// Get all farmers
router.get('/farmers', async (req, res) => {
  try {
    const farmers = await User.find({ role: 'farmer' }).select('-password');
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific farmer
router.get('/farmers/:id', async (req, res) => {
  try {
    const farmer = await User.findById(req.params.id).select('-password');
    if (!farmer || farmer.role !== 'farmer') {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    res.json(farmer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Scheme management routes
// Get all schemes
router.get('/schemes', async (req, res) => {
  try {
    const schemes = await Scheme.find();
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new scheme
router.post('/schemes', async (req, res) => {
  try {
    const scheme = new Scheme({
      ...req.body,
      createdBy: req.user._id
    });
    const savedScheme = await scheme.save();
    res.status(201).json(savedScheme);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a scheme
router.put('/schemes/:id', async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }
    
    Object.assign(scheme, req.body);
    const updatedScheme = await scheme.save();
    res.json(updatedScheme);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a scheme
router.delete('/schemes/:id', async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }
    
    await scheme.remove();
    res.json({ message: 'Scheme deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Market price management routes
// Get all market prices
router.get('/prices', async (req, res) => {
  try {
    const prices = await MarketPrice.find().sort({ date: -1 });
    res.json(prices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new market price
router.post('/prices', async (req, res) => {
  try {
    const price = new MarketPrice({
      ...req.body,
      updatedBy: req.user._id
    });
    const savedPrice = await price.save();
    res.status(201).json(savedPrice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a market price
router.put('/prices/:id', async (req, res) => {
  try {
    const price = await MarketPrice.findById(req.params.id);
    if (!price) {
      return res.status(404).json({ message: 'Price not found' });
    }
    
    Object.assign(price, req.body);
    price.updatedBy = req.user._id;
    const updatedPrice = await price.save();
    res.json(updatedPrice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a market price
router.delete('/prices/:id', async (req, res) => {
  try {
    const price = await MarketPrice.findById(req.params.id);
    if (!price) {
      return res.status(404).json({ message: 'Price not found' });
    }
    
    await price.remove();
    res.json({ message: 'Price deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get government profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;