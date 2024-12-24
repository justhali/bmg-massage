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

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid && !existingUser) {
            return res.status(401).json({ message: "user doesn't exist" });
        } else if (isPasswordValid && existingUser) {

            res.status(200).json({ message: "Login successful", existingUser });
        }


    } catch (error) {
        res.status(500).json({ message: "Error during login", error });
    }
};