const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },

    userEmail: {
        type: String,
        required: true,
        unique: true
    },

    userPassword: {
        type: String,
        required: true
    },

    koins: {
        type: Number,
        default: 0
    },

    lastDailyBonus: {
        type: Date,
        default: null
    }

}, { timestamps: true });

const user = mongoose.model('UserDetails', schema);

module.exports = user;