const express = require("express");

const {
    handleGetBadges,
    handleGetUserBadges
} = require("../Controller/badgeController");

const router = express.Router();


// Get all available badges
router.get("/badges", handleGetBadges);


// Get badges for a particular user
router.get("/user/:userId", handleGetUserBadges);


module.exports = router;