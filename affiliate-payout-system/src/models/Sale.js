const mongoose = require("mongoose");

// console.log("Sale model loaded");

const saleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    brand : {
        type : String,
        required : true
    },

    earning : {
        type : Number,
        required : true
    },

    status : {
        type : String,
        enum : ["pending" , "approved" , "rejected"],
        default : "pending"
    },

    advancePaid :{
        type : Boolean,
        default : false
    },
    
    advanceAmount : {
        type : Number,
        default : 0
    },

    finalProcessed : {
        type : Boolean,
        default : false
    }
} , {timestamps : true});

module.exports = mongoose.model("Sale" , saleSchema);