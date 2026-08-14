const mongoose = require("mongoose");

const scratchCardSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
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
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "ScratchCard",
    scratchCardSchema
);