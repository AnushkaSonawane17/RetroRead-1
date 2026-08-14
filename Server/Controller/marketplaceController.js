const Book = require("../Model/bookModel");

const handleAddBook = async (req, res) => {
    try {
        const data = req.body;

        const book = await Book.create(data);

        return res.status(201).json({
            Message: "Book listed successfully",
            book
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message
        });
    }
};
const handleGetBooks = async (req, res) => {
    try {

        const books = await Book.find({
            isAvailable: true
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            books
        });

    } catch (err) {

        return res.status(500).json({
            Message: err.message
        });
    }
};
const handleGetSellerBooks = async (req, res) => {
    try {

        const { sellerId } = req.params;

        const books = await Book.find({
            sellerId
        });

        return res.status(200).json({
            books
        });

    } catch (err) {

        return res.status(500).json({
            Message: err.message
        });
    }
};

module.exports={
    handleAddBook, handleGetBooks, handleGetSellerBooks
};