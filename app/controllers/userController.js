const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error while creating a new user', error });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "User doesn't exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Générer le JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        const userWithoutPassword = {
            id: user.id,
            email: user.email,
            username: user.username
        };

        res.status(200).json({
            message: "Login successful",
            user: userWithoutPassword,
            token
        });

    } catch (error) {
        res.status(500).json({ message: "Error during login", error });
    }
};

exports.validateUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findOne({
            where: { id: userId },
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json(user);
    } catch (error) {
        console.error('Erreur validation token:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};