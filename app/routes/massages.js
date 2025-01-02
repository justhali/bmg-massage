const express = require('express');
const router = express.Router();
const massageController = require('../controllers/massageController');
const authMiddleware = require('../middleware/auth');

router.post('/massage', massageController.createMassage);
router.get('/massages', massageController.getMassages);
router.get('/massages/:id', authMiddleware, massageController.getMassage);
router.delete('/massages/:id', massageController.deleteMassage);


module.exports = router;