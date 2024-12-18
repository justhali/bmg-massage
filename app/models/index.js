const Massage = require('./Massage');
const Booking = require('./Booking');
const User = require('./User');

Massage.hasMany(Booking, { foreignKey: 'massageId' });
Booking.belongsTo(Massage, { foreignKey: 'massageId' });


module.exports = { Booking, Massage, User };
