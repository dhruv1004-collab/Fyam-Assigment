const User = require("../models/User");
const Withdrawal = require("../models/Withdrawal")

const createWithdrawal = async (req , res) => {
    try {
        const { userId , amount } = req.body;

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not Found"
            });
        }

        if(user.withdrawableBalance < amount){
            return res.status(400).json({
                success : false,
                message : "Insufficient balance"
            });
        }

        if(amount < 100){
            return res.status(400).json({
                success : false,
                message : "Minimum withdrawal is ₹100"
            })
        }

        if(user.lastWithdrawlAt){
            const diff = Date.now() - new Date(user.lastWithdrawlAt).getTime();

            if(diff < 24 * 60*60*1000){
                return res.status(400).json({
                    success : false,
                    message : "Only one withdrawal allowed every 24 hours"
                });
            }
        }

        await Withdrawal.create({
            userId,
            amount,
            status : "success"
        });

        user.withdrawableBalance -= amount;
        user.lastWithdrawlAt = new Date();

        await user.save();

        res.json({
            success : true,
            message : "Withdrawal successfull",
            balance: user.withdrawableBalance
        });
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
};

module.exports = {
    createWithdrawal
};