const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique: true
    },
    withdrawableBalance:{
        type : Number,
        default : 0
    },
    lastWithdrawlAt:{
        type : Date,
        default: null
    }
}, { timestamps : true });

module.exports = mongoose.model("User" , userSchema);