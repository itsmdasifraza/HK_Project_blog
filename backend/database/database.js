require('dotenv').config()
const mongoose = require('mongoose');
const mongoUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00.s4uhv.mongodb.net:27017,cluster0-shard-00-01.s4uhv.mongodb.net:27017,cluster0-shard-00-02.s4uhv.mongodb.net:27017/${process.env.MONGO_DATABASE}?ssl=true&replicaSet=atlas-haaizc-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.connect(mongoUrl , (err,data)=>{
    if(err){ console.log(err); }
    if(data){ console.log("Node Application Started Successfully!"); }
});