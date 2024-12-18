require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const syncDatabase = require('./config/syncDatabase');
const massageRoutes = require('./routes/massages')
const bookingRoutes = require('./routes/bookings')
const timeSlotRoutes = require('./routes/timeSlots')
const app = express();

const port = process.env.PORT || 3001;

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.use(express.json());

// DATABASE
connectDB();
syncDatabase();

app.use('/', massageRoutes);
app.use('/', bookingRoutes);
app.use('/', timeSlotRoutes);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})