const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize')

const TimeSlot = sequelize.define(
    'TimeSlot', {
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    isBooked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});


module.exports = TimeSlot;

