const express = require('express');
const router = express.Router();

const testimonials = [
  {
    name: 'Jane Mwangi',
    role: 'Farmer',
    message: 'The platform helped me increase my yield and conserve water. The AI advice is spot on!'
  },
  {
    name: 'Samuel Otieno',
    role: 'Government Officer',
    message: 'We now have real-time data to make better land management decisions. Highly recommended.'
  },
  {
    name: 'Amina Yusuf',
    role: 'Community Leader',
    message: 'Our degraded land is recovering thanks to the restoration programs and training.'
  }
];

router.get('/', (req, res) => {
  res.json(testimonials);
});

module.exports = router;
