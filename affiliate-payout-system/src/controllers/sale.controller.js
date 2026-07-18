const Sale = require("../models/Sale");

const createSale = async (req, res) => {
    try {
        // console.log(req.body); // Debug

        const sale = await Sale.create(req.body);

        res.status(201).json({
            success: true,
            data: sale
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getSales = async (req , res) => {
    try {
        const sales = await Sale.find().populate("userId" , "username");

        res.json({
            success : true,
            count : sales.length,
            data : sales
        });
    }catch (error){
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
};

module.exports = {
    createSale, getSales
};