const express = require("express");

const saleRoutes = require("./routes/sale.routes");
const payoutRoutes = require("./routes/payout.routes");
const withdrawalRoutes = require("./routes/withdrawal.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());

app.get("/" , (req , res) => 
{
    res.json({
        success : true,
        message : "Affiliate Payout System API is running...."
    })
})

app.use("/api/users" , userRoutes);
app.use("api/sales" , saleRoutes);
app.use("api/payouts" , payoutRoutes);
app.use("/api/withdrawals" , withdrawalRoutes);

module.exports = app;