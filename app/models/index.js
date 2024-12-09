const Massage = require('./Massage');
const Booking = require('./Booking');
const TemporaryUser = require('./TemporaryUser');
// const TimeSlot = require('./TimeSlot');

Massage.hasMany(Booking, { foreignKey: 'massageId' });
Booking.belongsTo(Massage, { foreignKey: 'massageId' });

Booking.belongsTo(TemporaryUser, { foreignKey: 'temporaryUserId' });
TemporaryUser.hasMany(Booking, { foreignKey: 'temporaryUserId' });

// TimeSlot.belongsTo(Booking, { foreignKey: 'bookingId' });
// Booking.hasOne(TimeSlot, { foreignKey: 'bookingId' });

module.exports = { Booking, Massage, TemporaryUser };
