const mongoose = require("mongoose");

const triviaSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },

    options: {
        type: [String],
        required: true
    },

    correct: {
        type: Number,
        required: true
    },

    hint: {
        type: String
    }
});

const Trivia = mongoose.model("Trivia", triviaSchema);

module.exports = Trivia;