const Payment = require('../models/Payment');
const Massage = require('../models/Massage');
const sumupService = require('../services/sumupService');
const { v4: uuidv4 } = require('uuid');

exports.createCheckout = async (req, res) => {
    try {
        const { userId, massageId } = req.body;

        const massage = await Massage.findByPk(massageId, {
            attributes: ['price']
        });

        if (!massage) {
            return res.status(404).json({ message: 'Massage not found' });
        }

        const checkoutReference = `${userId}_${massageId}_${Date.now()}_${uuidv4()}`;
        const checkout = await sumupService.createCheckout(
            massage.price,
            checkoutReference
        );

        await Payment.create({
            amount: massage.price,
            currency: massage.currency,
            status: 'pending',
            userId,
            massageId,
        });

        res.status(201).json({
            message: 'Checkout créé avec succès.',
            checkout,
        });
    } catch (error) {
        console.error('Erreur lors de la création du checkout :', error.message);
        res.status(500).json({ message: 'Erreur lors de la création du checkout.' });
    }
};

