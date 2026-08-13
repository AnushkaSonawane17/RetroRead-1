const mongoose = require("mongoose");

const scratchCardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    reward: {
        type: Number,
        required: true
    },

    claimedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ScratchCard", scratchCardSchema);