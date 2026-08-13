const Coin = require("../Model/coinModel");
const Streak = require("../Model/streakModel");
const UserBadge = require("../Model/userBadgeModel");
const Transaction = require("../Model/transactionModel");


const handleGetProgress = async (req, res) => {

    try {

        const { userId } = req.params;


        // Get user's coin balance
        const coinData = await Coin.findOne({
            userId
        });


        // Get user's streak
        const streakData = await Streak.findOne({
            userId
        });


        // Get user's unlocked badges
        const badgeData = await UserBadge.find({
            userId,
            unlocked: true
        });


        // Count Trivia rewards
        const triviaCompleted = await Transaction.countDocuments({
            userId,
            type: "Trivia"
        });


        // Count Guess the Book rewards
        const guessBookCompleted = await Transaction.countDocuments({
            userId,
            type: "Guess the Book"
        });


        return res.status(200).json({

            coins: coinData ? coinData.balance : 0,

            currentStreak: streakData
                ? streakData.currentStreak
                : 0,

            longestStreak: streakData
                ? streakData.longestStreak
                : 0,

            badges: badgeData.length,

            triviaCompleted,

            guessBookCompleted

        });


    } catch (err) {

        return res.status(500).json({
            Message: err.message
        });

    }

};


module.exports = {
    handleGetProgress
};