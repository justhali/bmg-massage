const sequelize = require('./sequelize');
const { Booking, Massage, TemporaryUser, TimeSlot } = require('../models/index');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synchronized!');
    } catch (error) {
        console.error('Error synchronizing database:', error)
    }
}

module.exports = syncDatabase;