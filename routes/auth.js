const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../Model/User'); 
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;
const verifyToken = require('../middelware/verify');


router.post('/registrer', verifyToken , async (req, res) => {
    const { email, password, passwordConfirm, firstname, lastname } = req.body;

    if (!email || !password || !passwordConfirm) {
        return res.status(400).json({ error: 'Email et mot de passe requis.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Adresse email invalide.' });
    }

    if (password !== passwordConfirm) {
        return res.status(400).json({ error: 'Les mots de passe ne correspondent pas.' });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 8 caractères.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            firstname,
            lastname
        });

        res.status(201).json({
            message: 'Utilisateur créé avec succès !',
            userId: newUser.id
        });

    } catch (err) {
        console.error(err);
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
        }
        res.status(500).json({ error: 'Erreur serveur.' });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe requis.' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });

        res.json({ message: 'Connexion réussie !', token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
});



 
 

module.exports = router;
