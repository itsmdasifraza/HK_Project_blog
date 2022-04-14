const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogPostSchema = new Schema ({
	userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    title : {
        type : String,
        required : true,
		unique : true
    },
    description : {
        type : String,
        required : true,
    },
	featuredImage : {
        type : String,
        required : true,
    },
	author : {
        type : String,
        required : true,
    },
	slug : {
        type : String,
        required : true,
		unique : true
    },
	article : {
        type : String,
        required : true,
    },
	verified : {
		type : Boolean,
		default : false,
		required : true,
	},
    timestamp : {
        type : Date,
        default : Date.now,
        required : true
    },
});

const blogPostModel = mongoose.model('blogPost', blogPostSchema);
module.exports = blogPostModel;