const Massage = require('./Massage');
const Booking = require('./Booking');
const TemporaryUser = require('./TemporaryUser');
const TimeSlot = require('./TimeSlot');
// Massage.hasMany(Booking);
// Booking.belongsTo(Massage, {
//     foreignKey: 'massageId',
//     constraints: false
// });

Massage.hasMany(Booking, { foreignKey: 'massageId', as: 'bookings' });
Booking.belongsTo(Massage, { foreignKey: 'massageId', as: 'massage' });

Booking.belongsTo(TemporaryUser, { foreignKey: 'temporaryUserId' });
TemporaryUser.hasMany(Booking, { foreignKey: 'temporaryUserId' });

TimeSlot.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });
Booking.hasOne(TimeSlot, { foreignKey: 'bookingId', as: 'timeSlot' });

module.exports = { Booking, Massage, TemporaryUser, TimeSlot };
