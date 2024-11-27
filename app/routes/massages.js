const express = require('express');
const router = express.Router();
const massageController = require('../controllers/massageController');

router.post('/massage', massageController.createMassage);
router.get('/massages', massageController.getMassages);
router.get('/massages/:id', massageController.getMassage);
router.delete('/massages/:id', massageController.deleteMassage);
// router.get('/massagesbooked', massageController.getMassagesWithBooking);

module.exports = router;