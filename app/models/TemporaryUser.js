const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const TemporaryUser = sequelize.define('TemporaryUser', {
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true,
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = TemporaryUser;