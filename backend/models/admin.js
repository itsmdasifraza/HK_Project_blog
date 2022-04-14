const mongoose = require('mongoose');

const adminSchema = {
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    timestamp : {
        type : Date,
        default : Date.now,
        required : true
    }
}

const adminModel = mongoose.model('admin', adminSchema);
module.exports = adminModel;