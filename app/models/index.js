const Massage = require('./Massage');
const Booking = require('./Booking');
const User = require('./User');
const Payment = require('./Payment');

Massage.hasMany(Booking, { foreignKey: 'massageId' });
Booking.belongsTo(Massage, { foreignKey: 'massageId' });

Booking.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Booking, { foreignKey: 'userId' });

Massage.hasMany(Payment, { foreignKey: 'massageId' });
Payment.belongsTo(Massage, { foreignKey: 'massageId' });

Payment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Payment, { foreignKey: 'userId' });

module.exports = { Booking, Massage, User, Payment };
