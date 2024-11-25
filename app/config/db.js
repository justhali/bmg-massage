const sequelize = require('./sequelize');

const connectDB = async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

module.exports = connectDB;