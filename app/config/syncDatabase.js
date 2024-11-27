const sequelize = require('./sequelize');
const { Booking, Massage } = require('../models/index');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true, force: false });
        console.log('Database synchronized!');
    } catch (error) {
        console.error('Error synchronizing database:', error)
    }
}

module.exports = syncDatabase;