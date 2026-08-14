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

    coinData.balance += Number(coins);

    await coinData.save();

    await Transaction.create({
        userId,
        type,
        coins: Number(coins),
        description
    });

    return coinData.balance;
};


// ===============================
// DAILY BONUS
// ===============================

const handleDailyBonus = async (req, res) => {

    try {

        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                Message: "User ID is required"
            });
        }

        let coinData = await Coin.findOne({ userId });

        // Create coin account if it doesn't exist
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


        // Update last bonus time
        coinData.lastDailyBonus = now;

        await coinData.save();


        return res.status(200).json({
            Message: "Daily bonus added",
            balance: newBalance
        });


    } catch (err) {

        return res.status(500).json({
            Message: err.message
        });

    }

};


// ===============================
// GET COIN BALANCE
// ===============================

const handleGetBalance = async (req, res) => {

    try {

        const { userId } = req.params;


        if (!userId) {

            return res.status(400).json({
                Message: "User ID is required"
            });

        }


        const coinData = await Coin.findOne({ userId });


        // If coin account doesn't exist yet,
        // simply return 0 instead of an error.
        if (!coinData) {

            return res.status(200).json({
                balance: 0
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


// ===============================
// GET TRANSACTIONS
// ===============================

const handleGetTransactions = async (req, res) => {

    try {

        const { userId } = req.params;


        const transactions = await Transaction.find({
            userId
        }).sort({
            createdAt: -1
        });


        return res.status(200).json({
            transactions
        });


    } catch (err) {

        return res.status(500).json({
            Message: err.message
        });

    }

};


// ===============================
// ADD COINS
// ===============================

const handleAddCoins = async (req, res) => {

    try {

        const {
            userId,
            coins,
            type,
            description
        } = req.body;


        if (!userId) {

            return res.status(400).json({
                Message: "User ID is required"
            });

        }


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

    handleDailyBonus,
    handleGetTransactions,
    handleGetBalance,
    handleAddCoins,
    addCoinsToUser

};