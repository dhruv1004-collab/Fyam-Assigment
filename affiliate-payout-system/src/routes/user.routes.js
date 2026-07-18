const express = require("express");
const { createUser , getBalance } = require("../controllers/user.controller");

const router = express.Router();

router.post("/" , createUser);

router.get("/:id/balance" , getBalance);

module.exports = router;