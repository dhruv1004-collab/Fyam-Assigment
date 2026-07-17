const mongoose = require("mongoose");

const payoutSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Type.ObjectId,
        ref : "User",
        required : true
    },

    saleId: {
        type : mongoose.Schema.Type.ObjectId,
        ref : "Sale"
    },

    type : {
        type : String,
        status : ["advance", "final" , "adjustment"],
        required : true
    },

    amount : {
        type : Number,
        required : true
    },

    status : {
        type : String , 
        status : ["pending" , "success" , "failed" , "cancelled" , "rejected"],
        default : "pending"
    }
} , {timestamps : true});

module.export = mongoose.model("Payout" , payoutSchema);