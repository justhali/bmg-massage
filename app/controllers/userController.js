const { Op } = require('sequelize');
const sequelize = require('../config/sequelize');
const { User } = require('../models/');

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOrCreate({
            where: { email },
            defaults: {
                username,
                email,
                password
            }
        });
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Error while creating a new user', error });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isValidPassword = await user.isPasswordValid(password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Error during login", error });
    }
};
