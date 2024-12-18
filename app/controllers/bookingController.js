const { Op } = require('sequelize');
const moment = require("moment");
moment.locale('fr');
const sequelize = require('../config/sequelize');
const { Booking, Massage, User } = require('../models/');

exports.createBooking = async (req, res) => {
    const { massageId, bookingDate, status, userId } = req.body;

    try {

        const massage = await Massage.findByPk(massageId);
        if (!massage) {
            return res.status(400).json({ message: "Massage not found" });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(400).json({ user: "User not found" });
        }

        const existingBooking = await Booking.findOne({
            where: {
                massageId,
                bookingDate,
                status: {
                    [Op.ne]: 'annulée'
                },
            }
        });
        if (existingBooking) {
            return res.status(400).json({ message: 'This date is already booked' });
        }

        const booking = await Booking.create({
            massageId,
            bookingDate,
            status,
            userId
        });


        res.status(201).json(booking);
    } catch (error) {
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
