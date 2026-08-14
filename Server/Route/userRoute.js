const express = require("express");

const {
    handleAddUserController,
    handleVerifyUserController,
    handleCheckUserController
} = require("../Controller/userController");

const router = express.Router();

router.post("/adduser", handleAddUserController);

router.post("/login", handleVerifyUserController);

router.post("/checkuser", handleCheckUserController);

module.exports = router;