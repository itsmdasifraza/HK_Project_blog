require('dotenv').config()
var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const userAuthToken = require('../middlewares/user-auth-token');
const adminAuthToken = require('../middlewares/admin-auth-token');
var jwtSecret = process.env.JWT_SECRET;
var blogPostModel = require('../models/blog-post');



router.post('/create',
    body('title', 'title must between 4 to 36 character').trim().isLength({ min: 4, max: 200}),
	body('description', 'description must between 4 to 36 character').trim().isLength({ min: 4, max: 200 }),
	body('featuredImage', 'valid url').trim().isLength({ min: 4, max: 200 }),
	body('slug', 'slug').trim().isLength({ min: 1, max: 200}),
	body('article', 'article').trim().isLength({ min: 1 }), userAuthToken,
	
    async (req, res) => {

        const errors = validationResult(req);

        // throw validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    

        // creating user object
			var newblogPost = new blogPostModel({
				userid : req.userid,
				title: req.body.title,
				description: req.body.description,
				featuredImage: req.body.featuredImage,
				author: req.username,
				slug: req.body.slug,
				article: req.body.article,
        });
       
        try {
           //pushing user object to mongo
			newblogPost.save(function (err, data) {
				if (err)
					return res.status(400).json({
						error: 'request failed',
						mssg: "something went wrong"
					});
			   if(data) {
					return res.status(200).json({
						success: 'request success',
						message : 'post created' 
					}); 
				}
			});
        } catch {
            return res.status(404).json({
                error: '404',
                mssg: "internal server error",
            });
        }
});

router.get('/find/verified',    
    async (req, res) => {
    try{
		var bp = await blogPostModel.find({verified : true});
		return res.status(200).json({
			mssg:"blog post fetched",
			data : bp
		});
    }
    catch{
        return res.status(500).json({
            mssg:"Internal server error"
		});
    }   
});

router.get('/find/unverified',    
    async (req, res) => {
    try{
		var bpu = await blogPostModel.find({verified : false});
		return res.status(200).json({
			mssg:"blog post fetched",
			data : bpu
		});
    }
    catch{
        return res.status(500).json({
            mssg:"Internal server error"
		});
    }   
});

router.get('/find/:slug',    
    async (req, res) => {
    try{
		var sbp = await blogPostModel.findOne({slug : req.params.slug, verified : true});
		return res.status(200).json({
			mssg:"Single blog post fetched",
			data : sbp
		});
    }
    catch{
        return res.status(500).json({
            mssg:"Internal server error"
		});
    }   
});
	
module.exports = router;