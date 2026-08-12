const Trivia = require("../Model/triviaModel");
const { addCoinsToUser } = require("./coinController");

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

const handleTriviaAnswer = async (req, res) => {
    try {
        const { userId, questionId, answer } = req.body;

        const trivia = await Trivia.findById(questionId);

        if (!trivia) {
            return res.status(404).json({
                Message: "Question not found"
            });
        }

        if (Number(answer) === trivia.correct) {

            const newBalance = await addCoinsToUser(
                userId,
                20,
                "Trivia",
                "Correct trivia answer"
            );

            return res.status(200).json({
                Message: "Correct answer",
                correct: true,
                coins: 20,
                balance: newBalance
            });
        }

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
    handleGetTrivia, handleTriviaAnswer
};