const express = require("express");

const {
    handleGetTrivia, handleTriviaAnswer
} = require("../Controller/triviaController");

const router = express.Router();

router.get("/", handleGetTrivia);
router.post("/answer", handleTriviaAnswer);

module.exports = router;