const { get } = require("mongoose");
const User = require("../models/User");

const createUser = async (req , res) => {
    try{
        const { username } = req.body;

        const existingUser = await User.findOne({username});

        if (existingUser) {
            return res.status(400).json({
                success : false,
                message : "User Already exist"
            })
        }

        const user = await User.create({
            username
        });

        res.status(201).json({
            success : true,
            data : user
        });
    }catch (error){
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
}

const getBalance = async (req , res) => {
    try{
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not Found"
            });
        }

        res.json({
            success : true,
            withdrawableBalance : user.withdrawableBalance
        });
    }catch(error){
        res.status(500).json({
            success : false,
            message: error.message
        })
    }
}

module.exports = {
    createUser , getBalance
}