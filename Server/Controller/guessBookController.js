const GuessBook = require("../Model/guessBookModel");
const { addCoinsToUser } = require("./coinController");

const handleGetBooks = async (req, res) => {
    try {
        const books = await GuessBook.find();

        return res.status(200).json({
            books
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message
        });
    }
};


const handleGuessBook = async (req, res) => {
    try {
        const { userId, questionId, selectedBookId } = req.body;

        const book = await GuessBook.findById(questionId);

        if (!book) {
            return res.status(404).json({
                Message: "Book not found"
            });
        }

        if (selectedBookId === questionId) {

            const newBalance = await addCoinsToUser(
                userId,
                15,
                "Guess the Book",
                "Correct book guess"
            );

            return res.status(200).json({
                Message: "Correct guess",
                correct: true,
                coins: 15,
                balance: newBalance
            });
        }

        return res.status(200).json({
            Message: "Wrong guess",
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
    handleGetBooks,
    handleGuessBook
};