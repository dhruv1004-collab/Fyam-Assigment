const mongoose = require("mongoose");


const payoutSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    saleId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Sale"
    },

    type : {
        type : String,
        enum : ["advance", "final" , "adjustment"],
        required : true
    },

    amount : {
        type : Number,
        required : true
    },

    status : {
        type : String , 
        enum : ["pending" , "success" , "failed" , "cancelled" , "rejected"],
        default : "pending"
    }
} , {timestamps : true});

module.exports = mongoose.model("Payouts" , payoutSchema);