require('dotenv').config()
var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var jwtSecret = process.env.JWT_SECRET;
var userModel = require('../models/user');
router.post('/',
    body('email','wrong username or email').isLength({ min: 1 }),
    body('password','password must be minimum 8 character').isLength({ min: 1 }),
     async (req, res) => {

    const errors = validationResult(req);
    
    // throw validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
         try{
        //check email already exist or not
        let emailExist = await userModel.findOne({email:req.body.email});
        if(emailExist){
            //verify password
            let jwtData = {
                    id : emailExist.id ,
					username : emailExist.username
            }
            if(bcrypt.compareSync(req.body.password, emailExist.password)){
                let token = jwt.sign( jwtData, jwtSecret);
                return res.status(200).json({
                    token : token,
                    mssg: "verified with email password.",
                    data : emailExist
                });
            }
            else{
                return res.status(400).json({error:'request failed',
            mssg:"password isn't correct to this account."});
            }  
        } 
        else{
            return res.status(400).json({error:'request failed',
            mssg:"email isn't connected to an account."});
        }
    }
    catch{
        return res.status(404).json({error:'404',
        mssg:"internal server error.",
       });
     }
    
    
  
    

});
module.exports = router;