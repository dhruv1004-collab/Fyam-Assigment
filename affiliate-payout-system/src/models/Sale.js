const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectID,
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
        states : ["pending" , "approved" , "rejected"],
        default : "pending"
    },

    advancePaid :{
        type : Boolean,
        default : true
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