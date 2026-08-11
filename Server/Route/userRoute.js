
const express = require("express");

const {
  handleAddUserController,
  handleVerifyUserController
} = require("../Controller/userController");

const router = express.Router();

router.post("/adduser", handleAddUserController);

router.post("/login", handleVerifyUserController);

module.exports = router;
