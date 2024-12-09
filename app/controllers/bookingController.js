const { Op } = require('sequelize');
const moment = require("moment");
moment.locale('fr');
const sequelize = require('../config/sequelize');
const { Booking, Massage, TemporaryUser, TimeSlot } = require('../models/');

exports.createBooking = async (req, res) => {
    const { massageId, bookingDate, startTimeSlotId, status, email, phoneNumber } = req.body;

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


        // const startTime = await TimeSlot.findByPk(startTimeSlotId);
        // if (!startTime || startTime.isBooked) {
        //     await transaction.rollback();
        //     return res.status(400).json({ message: "The selected time slot is not available" });
        // }

        // const endTime = new Date(`1970-01-01T${startTime.startTime}`);
        // endTime.setMinutes(endTime.getMinutes() + massage.duration);

        // const overlappingSlots = await TimeSlot.findAll({
        //     where: {
        //         startTime: { [Op.gte]: startTimeSlot.startTime },
        //         endTime: { [Op.lte]: endTime.toISOString().slice(11, 19) },
        //         isBooked: false,
        //     },
        // });

        // if (overlappingSlots.length !== Math.ceil(massage.duration / 30)) {
        //     await transaction.rollback();
        //     return res.status(400).json({ message: "The selected time range is not fully available" });
        // }


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
