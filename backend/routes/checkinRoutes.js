const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const mobileOnly = require('../middleware/mobileOnly');
const { checkIn, checkOut } = require('../controllers/checkinController');

router.post('/in', auth, mobileOnly, checkIn);
router.post('/out', auth, mobileOnly, checkOut);

module.exports = router;
