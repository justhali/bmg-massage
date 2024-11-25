const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bmg_massage', 'bmg_user', 'strong_password', {
    host: 'localhost',
    dialect: 'mariadb'
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

module.exports = { sequelize, connectDB };