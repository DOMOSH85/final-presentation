const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Farmer-only route
router.get('/farmer', auth, role('farmer'), (req, res) => {
  res.json({ message: 'Welcome Farmer', user: req.user });
});

// Government officer-only route
router.get('/government', auth, role('government'), (req, res) => {
  res.json({ message: 'Welcome Government Officer', user: req.user });
});

// Any authenticated user
router.get('/profile', auth, (req, res) => {
  res.json({ message: 'Profile', user: req.user });
});

module.exports = router;
