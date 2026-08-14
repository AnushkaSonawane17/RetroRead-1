const Trivia = require("../Model/triviaModel");
const { addCoinsToUser } = require("./coinController");
const { updateBadgeProgress } = require("./badgeController");


// =====================================================
// GET TRIVIA QUESTIONS
// =====================================================

const handleGetTrivia = async (req, res) => {

    try {

        const questions = await Trivia.find()
            .select("-correct");

        return res.status(200).json({
            questions
        });

    } catch (err) {

        return res.status(500).json({
            Message: err.message
        });

    }

};


// =====================================================
// CHECK TRIVIA ANSWER
// =====================================================

const handleTriviaAnswer = async (req, res) => {

    try {

        const {
            userId,
            questionId,
            answer
        } = req.body;


        // Find question
        const trivia = await Trivia.findById(questionId);

        if (!trivia) {

            return res.status(404).json({
                Message: "Question not found"
            });

        }


        // =================================================
        // CORRECT ANSWER
        // =================================================

        if (Number(answer) === trivia.correct) {


            // Give 20 KOINS
            const newBalance = await addCoinsToUser(
                userId,
                20,
                "Trivia",
                "Correct trivia answer"
            );


            // Update Trivia badge progress
            await updateBadgeProgress(
                userId,
                "trivia",
                1
            );


            return res.status(200).json({

                Message: "Correct answer",

                correct: true,

                coins: 20,

                balance: newBalance

            });

        }


        // =================================================
        // WRONG ANSWER
        // =================================================

        return res.status(200).json({

            Message: "Wrong answer",

            correct: false,

            coins: 0

        });


    } catch (err) {

        return res.status(500).json({
            Message: err.message
        });

    }

};


module.exports = {
    handleGetTrivia,
    handleTriviaAnswer
};