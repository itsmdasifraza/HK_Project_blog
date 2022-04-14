const mongoose = require('mongoose');

const userSchema = {
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

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;