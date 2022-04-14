require('dotenv').config()
var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');
var jwtSecret = process.env.JWT_SECRET;

var adminModel = require('../models/admin');



router.post('/',
    body('username', 'username must between 4 to 36 character').trim().isLength({ min: 4, max: 36 }),
    body('email', 'email must be valid').isEmail(),
    body('password', 'password must be minimum 8 character').trim().isLength({ min: 8 }),
    async (req, res) => {

        const errors = validationResult(req);

        // throw validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // enctypting password 
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        // creating user object
        var newAdmin = new adminModel({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
       
        try {
           //pushing user object to mongo
			newAdmin.save(function (err, data) {
				if (err)
					return res.status(400).json({
						error: 'request failed',
						mssg: "something went wrong"
					});
			   if(data) {
					return res.status(200).json({
						success: 'request success',
						info: { username: data.username, email: data.email }
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
module.exports = router;