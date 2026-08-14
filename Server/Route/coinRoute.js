const express = require("express");

const {
    handleDailyBonus,
    handleGetTransactions,
    handleGetBalance,
    handleAddCoins
} = require("../Controller/coinController");


const router = express.Router();


router.post("/dailybonus", handleDailyBonus);

router.get("/transactions/:userId", handleGetTransactions);

router.get("/balance/:userId", handleGetBalance);

router.post("/addcoins", handleAddCoins);


module.exports = router;