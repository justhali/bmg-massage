require('dotenv').config();
const express = require('express');
const { sequelize, connectDB } = require('./config/db');
const app = express();

const port = process.env.PORT || 3000;

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.use(express.json());

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})