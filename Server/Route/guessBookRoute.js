const express = require("express");

const {
    handleGetBooks,
    handleGuessBook
} = require("../Controller/guessBookController");

const router = express.Router();

router.get("/", handleGetBooks);

router.post("/answer", handleGuessBook);

module.exports = router;