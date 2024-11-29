const sequelize = require('../config/sequelize');
const { Booking, Massage, TemporaryUser } = require('../models/');

exports.createBooking = async (req, res) => {
    const { massageId, bookingDate, status, email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
        return res.status(400).json({ message: "Email or phone number is required" });
    }

    const transaction = await sequelize.transaction();

    try {
        const massage = await Massage.findByPk(massageId);
        if (!massage) {
            await transaction.rollback();
            return res.status(400).json({ message: "Massage not found" });
        }

        const [temporaryUser] = await TemporaryUser.findOrCreate({
            where: {
                email: email || null,
                phoneNumber: phoneNumber || null,
            },
            transaction,
        });


        const booking = await Booking.create({
            massageId,
            bookingDate,
            status,
            temporaryUserId: temporaryUser.id,
        }, { transaction });

        await transaction.commit();
        res.status(201).json(booking);
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: 'Error while creating a new booking', error });
    }
};

exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings)
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching all bookings', error });
    }
}

exports.getBooking = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: " This booking doesn't exist" })
        }
        res.status(200).json(booking)
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching the booking', error });
    }
}

exports.deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.destroy({ where: { id: req.params.id } });

        if (!deletedBooking) {
            return res.status(404).json({ message: " This reservation doesn't exist" })
        }
        res.status(200).json({ message: "reservation deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: 'Error while deleting the reservation', error });
    }
}

exports.getBookingWithMassage = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id, {
            include: {
                model: Massage,
            },
        });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking', error });
    }
};
