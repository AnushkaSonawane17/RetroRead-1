const express = require("express");

const {
    handleUpdateStreak
} = require("../Controller/streakController");

const router = express.Router();

router.post("/update", handleUpdateStreak);

module.exports = router;