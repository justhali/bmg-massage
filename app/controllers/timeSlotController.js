const { TimeSlot } = require('../models');

exports.createTimeSlots = async (req, res) => {
    try {
        const slots = [
            { startTime: '09:00:00', endTime: '09:30:00' },
            { startTime: '09:30:00', endTime: '10:00:00' },
            { startTime: '10:00:00', endTime: '10:30:00' },
            { startTime: '11:00:00', endTime: '10:30:00' },
            { startTime: '12:00:00', endTime: '12:30:00' },
            { startTime: '14:00:00', endTime: '14:30:00' },
            { startTime: '15:00:00', endTime: '15:30:00' },
            { startTime: '16:00:00', endTime: '16:30:00' },
            { startTime: '17:00:00', endTime: '17:30:00' },
            { startTime: '18:00:00', endTime: '18:30:00' },
        ];

        await TimeSlot.destroy({ where: {} });


        await TimeSlot.bulkCreate(slots);
        res.status(201).json({ message: 'Time slots created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating time slots', error });
    }
};

exports.getAvailableTimeSlots = async (req, res) => {
    try {
        const { date } = req.query;

        const availableSlots = await TimeSlot.findAll({
            where: {
                bookingDate: date,
                isBooked: false,
            },
        });

        res.status(200).json(availableSlots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching available time slots', error });
    }
};