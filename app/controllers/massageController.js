// const Booking = require('../models/Booking');
const Massage = require('../models/Massage');

exports.createMassage = async (req, res) => {
    try {
        const { name, description, price, duration, imageUrl } = req.body;
        const massage = await Massage.create({ name, description, price, duration, imageUrl });
        res.status(201).json(massage)
    } catch (error) {
        res.status(500).json({ message: 'Error while creating a new massage', error });
    }
}

exports.getMassages = async (req, res) => {
    try {
        const massages = await Massage.findAll();
        res.status(200).json(massages)
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching all massages', error });
    }
}

exports.getMassage = async (req, res) => {
    try {
        const massage = await Massage.findByPk(req.params.id);

        if (!massage) {
            return res.status(404).json({ message: " This massage doesn't exist" })
        }
        res.status(200).json(massage)
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching the massage', error });
    }
}

exports.deleteMassage = async (req, res) => {
    try {
        const deletedMassage = await Massage.destroy({ where: { id: req.params.id } });

        if (!deletedMassage) {
            return res.status(404).json({ message: " This massage doesn't exist" })
        }
        res.status(200).json({ message: "Massage deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: 'Error while deleting the massage', error });
    }
}

// exports.getMassagesWithBooking = async (req, res) => {
//     try {
//         const massages = await Massage.findAll({ include: Booking });
//         console.log(massages)
//         res.status(200).json(massages)
//     } catch (error) {
//         res.status(500).json({ message: 'Error while fetching massages', error });
//     }
// }