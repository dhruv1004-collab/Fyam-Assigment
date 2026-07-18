const express = require("express");

const {createSale , getSales } = require("../controllers/sale.controller");

const router = express.Router();

router.post("/" , createSale);
router.get("/" , getSales);

module.exports = router;