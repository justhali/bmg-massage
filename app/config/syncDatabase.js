
const { Massage } = require('../models/massage');
const sequelize = require('./sequelize');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synchronized!');
    } catch (error) {
        console.error('Error synchronizing database:', error)
    }
}

module.exports = syncDatabase;