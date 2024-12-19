const bcrypt = require('bcrypt')
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

        const existingUser = await User.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" })
        }
        res.status(200).json({
            message: "Login successful",
            user: existingUser
        });
    } catch (error) {
        res.status(500).json({ message: "Error during login", error });
    }
};
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching all massages', error });
    }
};
