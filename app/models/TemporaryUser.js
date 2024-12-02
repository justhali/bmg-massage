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
    },
    identifier: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
    }
});

module.exports = TemporaryUser;