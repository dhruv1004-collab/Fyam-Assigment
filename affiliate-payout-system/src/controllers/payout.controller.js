const Sale = require("../models/Sale");
const User = require("../models/User");
const Payout = require("../models/Payout");

const runAdvancePayout = async (req, res) => {
    try {

        // Find all pending sales whose advance is not yet paid
        const sales = await Sale.find({
            status: "pending",
            advancePaid: false
        });

        console.log("Sales to process:", sales.length);

        if (sales.length === 0) {
            return res.json({
                success: true,
                processedSales: 0,
                message: "No eligible sales found."
            });
        }

        for (const sale of sales) {

            console.log("Processing Sale:", sale._id);

            const advance = sale.earning * 0.10;

            // Create payout record
            await Payout.create({
                userId: sale.userId,
                saleId: sale._id,
                type: "advance",
                amount: advance,
                status: "success"
            });

            // Update user balance
            const updatedUser = await User.findByIdAndUpdate(
                sale.userId,
                {
                    $inc: {
                        withdrawableBalance: advance
                    }
                },
                { new: true }
            );

            console.log(
                "User Balance after update:",
                updatedUser.withdrawableBalance
            );

            // Mark sale as processed
            sale.advancePaid = true;
            sale.advanceAmount = advance;

            await sale.save();

            console.log("Sale updated successfully.");
        }

        res.json({
            success: true,
            processedSales: sales.length
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getPayouts = async (req, res) => {
    try {

        const payouts = await Payout.find()
            .populate("userId", "username")
            .populate("saleId");

        res.json({
            success: true,
            count: payouts.length,
            data: payouts
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const reconcileSales = async (req, res) => {
    try {

        const sales = await Sale.find({
            finalProcessed: false,
            advancePaid: true
        });

        console.log("Sales found:", sales.length);

        let processed = 0;

        for (const sale of sales) {

            const user = await User.findById(sale.userId);

            if (!user) continue;

            const remainingAmount = sale.earning - sale.advanceAmount;

            user.withdrawableBalance += remainingAmount;

            await user.save();

            await Payout.create({
                userId: sale.userId,
                saleId: sale._id,
                type: "final",
                amount: remainingAmount,
                status: "success"
            });

            sale.finalProcessed = true;

            await sale.save();

            processed++;
        }

        res.json({
            success: true,
            processedSales: processed
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    runAdvancePayout,
    getPayouts,
    reconcileSales
};

