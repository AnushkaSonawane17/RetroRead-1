const Coin = require("../Model/coinModel");
const Transaction = require("../Model/transactionModel");

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
        coinData.balance += 25;

        // Update bonus time
        coinData.lastDailyBonus = now;

        await coinData.save();

        // Create transaction
        await Transaction.create({
            userId,
            type: "Daily Bonus",
            coins: 25,
            description: "Daily bonus claimed"
        });

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

        if (!userId || !coins || !type) {
            return res.status(400).json({
                Message: "Required data missing"
            });
        }

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

        return res.status(200).json({
            Message: "Coins added",
            balance: coinData.balance
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message
        });
    }
};

module.exports = {
    handleDailyBonus, handleGetTransactions, handleGetBalance, handleAddCoins 
};