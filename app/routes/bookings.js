const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/booking', bookingController.createBooking);
router.get('/bookings', bookingController.getBookings);
router.get('/bookings/:id', bookingController.getBooking);
router.delete('/bookings/:id', bookingController.deleteBooking);

module.exports = router;