const mongoose = require("mongoose");

const userBadgeSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    badgeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Badge",
        required: true
    },

    progress: {
        type: Number,
        default: 0
    },

    unlocked: {
        type: Boolean,
        default: false
    },

    earnedAt: {
        type: Date,
        default: null
    }

});

userBadgeSchema.index(
    { userId: 1, badgeId: 1 },
    { unique: true }
);

const UserBadge = mongoose.model("UserBadge", userBadgeSchema);

module.exports = UserBadge;