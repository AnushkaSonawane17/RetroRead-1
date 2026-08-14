const Badge = require("../Model/badgeModel");
const UserBadge = require("../Model/userBadgeModel");


// ==========================================
// GET ALL AVAILABLE BADGES
// ==========================================

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


// ==========================================
// GET BADGES FOR A USER
// ==========================================

const handleGetUserBadges = async (req, res) => {

    try {

        const { userId } = req.params;

        // Get every badge available in RetroRead
        const allBadges = await Badge.find();

        // Make sure this user has a UserBadge record
        // for every available badge
        for (const badge of allBadges) {

            const existingUserBadge = await UserBadge.findOne({
                userId: userId,
                badgeId: badge._id
            });

            if (!existingUserBadge) {

                await UserBadge.create({
                    userId: userId,
                    badgeId: badge._id,
                    progress: 0,
                    unlocked: false,
                    earnedAt: null
                });

            }

        }

        // Get user's badges
        const userBadges = await UserBadge
            .find({ userId: userId })
            .populate("badgeId");

        return res.status(200).json({
            badges: userBadges
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            Message: err.message
        });

    }

};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
    handleGetBadges,
    handleGetUserBadges
};