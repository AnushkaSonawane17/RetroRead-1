const ScratchCard = require("../Model/scratchCardModel");
const { addCoinsToUser } = require("./coinController");


// ==========================================
// GET TODAY'S SCRATCH CARDS
// ==========================================

const handleGetScratchCards = async (req, res) => {

    try {

        const { userId } = req.params;

        if (!userId) {

            return res.status(400).json({
                Message: "User ID is required"
            });

        }


        // ==========================================
        // START OF TODAY
        // ==========================================

        const startOfDay = new Date();

        startOfDay.setHours(
            0,
            0,
            0,
            0
        );


        // ==========================================
        // END OF TODAY
        // ==========================================

        const endOfDay = new Date();

        endOfDay.setHours(
            23,
            59,
            59,
            999
        );


        // ==========================================
        // CHECK IF USER ALREADY SCRATCHED
        // ==========================================

        const existingCard =
            await ScratchCard.findOne({
                userId,
                claimedAt: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            });


        // ==========================================
        // FIVE CARDS
        // ==========================================

        const cards = [
            {
                id: 1,
                reward: 20
            },
            {
                id: 2,
                reward: 50
            },
            {
                id: 3,
                reward: 100
            },
            {
                id: 4,
                reward: 200
            },
            {
                id: 5,
                reward: 25
            }
        ];


        // ==========================================
        // SHUFFLE CARDS
        // ==========================================

        cards.sort(
            () => Math.random() - 0.5
        );


        // ==========================================
        // IF ALREADY SCRATCHED
        // ==========================================

        if (existingCard) {

            return res.status(200).json({

                scratched: true,

                reward: existingCard.reward,

                cards: cards.map(card => ({
                    ...card,
                    reward: null
                })),

                Message:
                    "You have already scratched today's card"

            });

        }


        // ==========================================
        // USER HAS NOT SCRATCHED
        // ==========================================

        return res.status(200).json({

            scratched: false,

            cards: cards.map(card => ({

                id: card.id,

                reward: null

            })),

            Message:
                "Scratch cards loaded successfully"

        });


    } catch (error) {

        console.log(
            "GET SCRATCH CARDS ERROR:",
            error
        );

        return res.status(500).json({

            Message:
                "Unable to load scratch cards",

            error:
                error.message

        });

    }

};



// ==========================================
// SCRATCH ONE CARD
// ==========================================

const handleScratchCard = async (req, res) => {

    try {

        const {
            userId,
            cardId
        } = req.body;


        // ==========================================
        // VALIDATION
        // ==========================================

        if (!userId) {

            return res.status(400).json({
                Message: "User ID is required"
            });

        }


        if (!cardId) {

            return res.status(400).json({
                Message: "Card ID is required"
            });

        }


        // ==========================================
        // START OF TODAY
        // ==========================================

        const startOfDay = new Date();

        startOfDay.setHours(
            0,
            0,
            0,
            0
        );


        // ==========================================
        // END OF TODAY
        // ==========================================

        const endOfDay = new Date();

        endOfDay.setHours(
            23,
            59,
            59,
            999
        );


        // ==========================================
        // CHECK IF ALREADY SCRATCHED
        // ==========================================

        const existingCard =
            await ScratchCard.findOne({

                userId,

                claimedAt: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }

            });


        if (existingCard) {

            return res.status(400).json({

                Message:
                    "You have already scratched today's card",

                reward:
                    existingCard.reward

            });

        }


        // ==========================================
        // POSSIBLE REWARDS
        // ==========================================

        const rewards = [
            20,
            50,
            100,
            200,
            25
        ];


        // ==========================================
        // RANDOM REWARD
        // ==========================================

        const reward =
            rewards[
                Math.floor(
                    Math.random() *
                    rewards.length
                )
            ];


        // ==========================================
        // ADD KOINS
        // ==========================================

        const newBalance =
            await addCoinsToUser(
                userId,
                reward,
                "Scratch Card",
                "Daily scratch card reward"
            );


        // ==========================================
        // SAVE SCRATCH
        // ==========================================

        await ScratchCard.create({

            userId,

            reward,

            claimedAt: new Date()

        });


        // ==========================================
        // RESPONSE
        // ==========================================

        return res.status(200).json({

            Message:
                "Scratch card scratched successfully",

            reward,

            balance:
                newBalance

        });


    } catch (error) {

        console.log(
            "SCRATCH CARD ERROR:",
            error
        );

        return res.status(500).json({

            Message:
                error.message

        });

    }

};


module.exports = {

    handleGetScratchCards,

    handleScratchCard

};