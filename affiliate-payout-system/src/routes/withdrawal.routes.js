const express = require("express");

const {
    createWithdrawal
} = require("../controllers/withdrawal.controller");

const router = express.Router();

router.post("/" , createWithdrawal);

module.exports = router;