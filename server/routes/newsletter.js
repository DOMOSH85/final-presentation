const express = require('express');
const router = express.Router();

let subscribers = [];

router.post('/', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email' });
  }
  subscribers.push(email);
  res.status(201).json({ message: 'Subscribed' });
});

// For demo: get all subscribers (not for production)
router.get('/', (req, res) => {
  res.json(subscribers);
});

module.exports = router;
