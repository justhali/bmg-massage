const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Booking = sequelize.define(
    'Booking', {
    bookingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
        },
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'en attente',
        validate: {
            isIn: [['confirmée', 'en attente', 'annulée']],
        },
    },
});

module.exports = Booking;

