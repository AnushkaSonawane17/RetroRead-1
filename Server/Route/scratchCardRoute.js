const express = require("express");

const {
    handleScratchCard
} = require("../Controller/scratchCardController");

const router = express.Router();


router.post("/scratch", handleScratchCard);


module.exports = router;