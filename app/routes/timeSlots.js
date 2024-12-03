const express = require('express');
const router = express.Router();
const { createTimeSlots } = require('../controllers/timeSlotController');

router.post('/timeSlot/create', createTimeSlots);

module.exports = router;
