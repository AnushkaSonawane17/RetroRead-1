// const Coin = require("../Model/coinModel");
// const Transaction = require("../Model/transactionModel");


// // ADD COINS TO USER
// const addCoinsToUser = async (
//     userId,
//     coins,
//     type,
//     description
// ) => {

//     let coinData = await Coin.findOne({ userId });

//     // If user doesn't have a coin account yet
//     if (!coinData) {
//         coinData = await Coin.create({
//             userId,
//             balance: 0
//         });
//     }

//     // Add coins
//     coinData.balance += coins;

//     await coinData.save();

//     // Create transaction history
//     await Transaction.create({
//         userId,
//         type,
//         coins,
//         description
//     });

//     return coinData.balance;
// };


// // DAILY BONUS
// const handleDailyBonus = async (req, res) => {

//     try {

//         const { userId } = req.body;

//         let coinData = await Coin.findOne({ userId });

//         // If user doesn't have a coin account yet
//         if (!coinData) {

//             coinData = await Coin.create({
//                 userId,
//                 balance: 0
//             });

//         }

//         const now = new Date();

//         // Check whether bonus was already claimed
//         if (coinData.lastDailyBonus) {

//             const timeDifference =
//                 now - coinData.lastDailyBonus;

//             const hoursPassed =
//                 timeDifference / (1000 * 60 * 60);

//             if (hoursPassed < 24) {

//                 return res.status(400).json({
//                     Message: "Daily bonus already claimed"
//                 });

//             }
//         }

//         // Add 25 coins
//         coinData.balance += 25;

//         // Update bonus time
//         coinData.lastDailyBonus = now;

//         await coinData.save();

//         // Create transaction
//         await Transaction.create({
//             userId,
//             type: "Daily Bonus",
//             coins: 25,
//             description: "Daily bonus claimed"
//         });

//         return res.status(200).json({
//             Message: "Daily bonus added",
//             balance: coinData.balance
//         });

//     } catch (err) {

//         return res.status(500).json({
//             Message: err.message
//         });

//     }
// };


// // GET TRANSACTIONS
// const handleGetTransactions = async (req, res) => {

//     try {

//         const { userId } = req.params;

//         const transactions = await Transaction.find({ userId })
//             .sort({ createdAt: -1 });

//         return res.status(200).json({
//             transactions
//         });

//     } catch (err) {

//         return res.status(500).json({
//             Message: err.message
//         });

//     }
// };


// // ADD COINS CONTROLLER
// const handleAddCoins = async (req, res) => {

//     try {

//         const {
//             userId,
//             coins,
//             type,
//             description
//         } = req.body;

//         const newBalance = await addCoinsToUser(
//             userId,
//             coins,
//             type,
//             description
//         );

//         return res.status(200).json({
//             Message: "Coins added",
//             balance: newBalance
//         });

//     } catch (err) {

//         return res.status(500).json({
//             Message: err.message
//         });

//     }
// };


// module.exports = {
//     handleDailyBonus,
//     handleGetTransactions,
//     handleAddCoins,
//     addCoinsToUser
// };
const ScratchCard = require("../Model/scratchCardModel");
const { addCoinsToUser } = require("./coinController");


const handleScratchCard = async (req, res) => {

    try {

        const { userId } = req.body;


        // Start of today
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);


        // End of today
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);


        // Check if user already scratched today
        const existingCard = await ScratchCard.findOne({
            userId,
            claimedAt: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });


        if (existingCard) {

            return res.status(400).json({
                Message: "You have already scratched today's card"
            });

        }


        // Possible rewards
        const rewards = [5, 10, 15, 20, 25];


        // Select random reward
        const reward =
            rewards[Math.floor(Math.random() * rewards.length)];


        // Add reward to user's coin balance
        const newBalance = await addCoinsToUser(
            userId,
            reward,
            "Scratch Card",
            "Scratch card reward"
        );


        // Save scratch card
        await ScratchCard.create({
            userId,
            reward
        });


        return res.status(200).json({
            Message: "Scratch card scratched successfully",
            reward: reward,
            balance: newBalance
        });


    } catch (err) {

        return res.status(500).json({
            Message: err.message
        });

    }

};


module.exports = {
    handleScratchCard
};