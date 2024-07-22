const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    name: String,
    address: String,
    phoneNumber: String,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('User', userSchema);
