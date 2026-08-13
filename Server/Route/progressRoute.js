const express = require("express");

const {
    handleGetProgress
} = require("../Controller/progressController");

const router = express.Router();

router.get("/:userId", handleGetProgress);

module.exports = router;