const mongoose = require("mongoose");

const guessBookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    emoji: {
        type: String
    },

    clue: {
        type: String,
        required: true
    }
});

const GuessBook = mongoose.model("GuessBook", guessBookSchema);

module.exports = GuessBook;