const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize')

const Payment = sequelize.define(
    'Payment', {
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
    },

});


module.exports = Payment;