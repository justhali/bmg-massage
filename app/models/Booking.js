const { Sequelize, DataTypes } = require('sequelize');
const Massage = require('./Massage')
const sequelize = require('../config/sequelize')

const Booking = sequelize.define(
    'Booking', {
    userId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    massageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Massage,
            key: 'id',
        },
    },
    bookingDate: {
        type: DataTypes.DATE,
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

