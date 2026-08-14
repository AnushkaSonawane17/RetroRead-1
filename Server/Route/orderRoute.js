const express = require("express");

const {
    handleClaimBook,
    handleGetBuyerOrders,
    handleGetSellerOrders,
    handleUpdateOrderStatus
} = require("../Controller/orderController");

const router = express.Router();

router.post("/claim", handleClaimBook);

router.get("/buyer/:buyerId", handleGetBuyerOrders);

router.get("/seller/:sellerId", handleGetSellerOrders);

router.patch("/status/:orderId", handleUpdateOrderStatus);

module.exports = router;