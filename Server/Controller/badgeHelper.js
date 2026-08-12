const Badge = require("../Model/badgeModel");
const UserBadge = require("../Model/userBadgeModel");

const updateBadgeProgress = async (
    userId,
    requirementType,
    progress
) => {

    const badges = await Badge.find({
        requirementType
    });

    if (!badges.length) {
        return;
    }

    for (const badge of badges) {

        let userBadge = await UserBadge.findOne({
            userId,
            badgeId: badge._id
        });

        if (!userBadge) {

            userBadge = await UserBadge.create({
                userId,
                badgeId: badge._id,
                progress: 0,
                unlocked: false
            });

        }

        // Don't reduce progress
        if (progress > userBadge.progress) {
            userBadge.progress = progress;
        }

        // Check target
        if (userBadge.progress >= badge.target) {

            userBadge.progress = badge.target;
            userBadge.unlocked = true;

            if (!userBadge.earnedAt) {
                userBadge.earnedAt = new Date();
            }

        }

        await userBadge.save();

    }

};

module.exports = {
    updateBadgeProgress
};