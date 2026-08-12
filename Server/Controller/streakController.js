const Streak = require("../Model/streakModel");

const handleUpdateStreak = async (req, res) => {
    try {
        const { userId } = req.body;

        let streakData = await Streak.findOne({ userId });

        if (!streakData) {
            streakData = await Streak.create({
                userId,
                currentStreak: 1,
                longestStreak: 1,
                lastActiveDate: new Date()
            });

            return res.status(200).json({
                Message: "Streak started",
                currentStreak: 1,
                longestStreak: 1
            });
        }

        const now = new Date();

        const today = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );

        const lastActive = streakData.lastActiveDate
            ? new Date(
                streakData.lastActiveDate.getFullYear(),
                streakData.lastActiveDate.getMonth(),
                streakData.lastActiveDate.getDate()
            )
            : null;

        const difference = lastActive
            ? (today - lastActive) / (1000 * 60 * 60 * 24)
            : null;

        // Already active today
        if (difference === 0) {
            return res.status(200).json({
                Message: "Streak already updated today",
                currentStreak: streakData.currentStreak,
                longestStreak: streakData.longestStreak
            });
        }

        // Active on consecutive day
        if (difference === 1) {
            streakData.currentStreak += 1;
        }

        // Missed one or more days
        else {
            streakData.currentStreak = 1;
        }

        if (streakData.currentStreak > streakData.longestStreak) {
            streakData.longestStreak = streakData.currentStreak;
        }

        streakData.lastActiveDate = now;

        await streakData.save();

        return res.status(200).json({
            Message: "Streak updated",
            currentStreak: streakData.currentStreak,
            longestStreak: streakData.longestStreak
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message
        });
    }
};

module.exports = {
    handleUpdateStreak
};