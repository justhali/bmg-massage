const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize')

const Massage = sequelize.define(
    'Massage', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER, // durée en minutes
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },

});

module.exports = Massage;

