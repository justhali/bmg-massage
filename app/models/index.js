const Massage = require('./Massage');
const Booking = require('./Booking');

// Massage.hasMany(Booking);
// Booking.belongsTo(Massage, {
//     foreignKey: 'massageId',
//     constraints: false
// });

Massage.hasMany(Booking, { foreignKey: 'massageId', as: 'bookings' });
Booking.belongsTo(Massage, { foreignKey: 'massageId', as: 'massage' });

module.exports = { Booking, Massage };
