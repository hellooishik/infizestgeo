const express = require('express');
const router = express.Router();
const { getReport, createEmployee } = require('../controllers/adminController');

router.get('/report', getReport);
router.post('/create', createEmployee); // simple open endpoint

module.exports = router;
