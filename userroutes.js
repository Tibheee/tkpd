const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rute pendaftaran pengguna
router.post('/register', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
});

// Rute login pengguna
router.post('/login', async (req, res) => {
    // Implementasi login
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).send('Invalid username or password');
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
        return res.status(401).send('Invalid username or password');
    }
    const token = user.generateToken();
    res.send({ token });
});

// Rute untuk melihat profil pengguna
router.get('/profile', async (req, res) => {
    const user = req.user;
    res.send(user);
});

// Rute untuk mengedit profil pengguna
router.put('/profile', async (req, res) => {
    const user = req.user;
    user.name = req.body.name;
    user.email = req.body.email;
    await user.save();
    res.send(user);
});

// Rute untuk mengatur ulang kata sandi
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send('User not found');
    }
    const resetToken = user.generateResetToken();
    await user.save();
    // Kirim email reset password ke user
    res.send('Reset password email sent');
});

// Rute untuk mengatur ulang kata sandi
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({ resetToken: token, resetTokenExpires: { $gt: Date.now() } });
    if (!user) {
        return res.status(404).send('Invalid token');
    }
    user.password = req.body.password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();
    res.send('Password reset successfully');
});

module.exports = router;
