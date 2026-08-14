const mongoose = require("mongoose");

const userBadgeSchema = new mongoose.Schema(
    {
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
    },
    {
        timestamps: true
    }
);


// Reuse the existing model if it has already been created
const UserBadge =
    mongoose.models.UserBadge ||
    mongoose.connection.models.UserBadge ||
    mongoose.model("UserBadge", userBadgeSchema);


module.exports = UserBadge;