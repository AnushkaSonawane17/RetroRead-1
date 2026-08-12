const Coin = require("../Model/coinModel");
const Transaction = require("../Model/transactionModel");
const addCoinsToUser = async (userId, coins, type, description) => {

    let coinData = await Coin.findOne({ userId });

    if (!coinData) {
        coinData = await Coin.create({
            userId,
            balance: 0
        });
    }

    coinData.balance += coins;

    await coinData.save();

    await Transaction.create({
        userId,
        type,
        coins,
        description
    });

    return coinData.balance;
};

const handleDailyBonus = async (req, res) => {
    try {

        const { userId } = req.body;

        let coinData = await Coin.findOne({ userId });

        // If user doesn't have a coin account yet
        if (!coinData) {
            coinData = await Coin.create({
                userId,
                balance: 0
            });
        }

        const now = new Date();

        // Check whether bonus was already claimed
        if (coinData.lastDailyBonus) {

            const timeDifference =
                now - coinData.lastDailyBonus;

            const hoursPassed =
                timeDifference / (1000 * 60 * 60);

            if (hoursPassed < 24) {
                return res.status(400).json({
                    Message: "Daily bonus already claimed"
                });
            }
        }

        // Add 25 coins
        const newBalance = await addCoinsToUser(
    userId,
    25,
    "Daily Bonus",
    "Daily bonus claimed"
);

        coinData.lastDailyBonus = now;
        await coinData.save();
        return res.status(200).json({
            Message: "Daily bonus added",
            balance: coinData.balance
        });

    } catch (err) {

        return res.status(500).json({
            Message: err.message
        });

    }
};

const handleGetTransactions = async (req, res) => {
    try {
        const { userId } = req.params;

        const transactions = await Transaction.find({ userId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            transactions
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message
        });
    }
};
const handleGetBalance = async (req, res) => {
    try {
        const { userId } = req.params;

        const coinData = await Coin.findOne({ userId });

        if (!coinData) {
            return res.status(404).json({
                Message: "Coin account not found"
            });
        }

        return res.status(200).json({
            balance: coinData.balance
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message
        });
    }
};
const handleAddCoins = async (req, res) => {
    try {
        const { userId, coins, type, description } = req.body;

        const newBalance = await addCoinsToUser(
            userId,
            coins,
            type,
            description
        );

        return res.status(200).json({
            Message: "Coins added",
            balance: newBalance
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message
        });
    }
};

module.exports = {
    handleDailyBonus, handleGetTransactions, handleGetBalance, handleAddCoins,addCoinsToUser
};