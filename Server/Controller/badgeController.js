const Badge = require("../Model/badgeModel");
const UserBadge = require("../Model/userBadgeModel");


// GET ALL AVAILABLE BADGES
const handleGetBadges = async (req, res) => {

    try {

        const badges = await Badge.find();

        return res.status(200).json({
            badges
        });

    } catch (err) {

        return res.status(500).json({
            Message: err.message
        });

    }

};


// GET BADGES FOR A USER
const handleGetUserBadges = async (req, res) => {

    try {

        const { userId } = req.params;

        // Get all badges available in RetroRead
        const allBadges = await Badge.find();

        // Check each badge for this user
        for (const badge of allBadges) {

            const existingUserBadge = await UserBadge.findOne({
                userId,
                badgeId: badge._id
            });

            // If user doesn't have this badge record yet,
            // create it with 0 progress
            if (!existingUserBadge) {

                await UserBadge.create({
                    userId,
                    badgeId: badge._id,
                    progress: 0,
                    unlocked: false,
                    earnedAt: null
                });

            }

        }

        // Now get all badge records for this user
        const userBadges = await UserBadge.find({
            userId
        }).populate("badgeId");

        return res.status(200).json({
            badges: userBadges
        });

    } catch (err) {

        return res.status(500).json({
            Message: err.message
        });

    }

};


module.exports = {
    handleGetBadges,
    handleGetUserBadges
};