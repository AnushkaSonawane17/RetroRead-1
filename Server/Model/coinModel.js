const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    balance: {
        type: Number,
        default: 0
    },

    lastDailyBonus: {
        type: Date,
        default: null
    }
});

const Coin = mongoose.model("Coin", coinSchema);

module.exports = Coin;