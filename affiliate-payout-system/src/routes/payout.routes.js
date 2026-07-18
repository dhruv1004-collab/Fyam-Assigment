const express = require("express");

const {runAdvancePayout , getPayouts , reconcileSales} = require("../controllers/payout.controller");

const router = express.Router();

router.post("/advance" , runAdvancePayout);
router.post("/reconcile" , reconcileSales)
router.get("/" , getPayouts)

module.exports = router;