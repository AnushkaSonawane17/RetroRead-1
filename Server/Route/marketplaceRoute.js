const express = require("express");

const {
    handleAddBook,
    handleGetBooks,
    handleGetSellerBooks
} = require("../Controller/marketplaceController");

const router = express.Router();

router.post("/add", handleAddBook);

router.get("/books", handleGetBooks);

router.get("/seller/:sellerId", handleGetSellerBooks);

module.exports = router;