const express = require("express");

const {
    handleGetScratchCards,
    handleScratchCard
} = require("../Controller/scratchCardController");

const router = express.Router();


// Get today's five cards
router.get(
    "/:userId",
    handleGetScratchCards
);


// Scratch one card
router.post(
    "/scratch",
    handleScratchCard
);


module.exports = router;