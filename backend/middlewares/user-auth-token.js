require('dotenv').config()
var jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = req.header("token");
    if (!token) {
        return res.status(401).json({ 
                            error: "401",
                            mssg: "access denied - unauthorized"
                             });
    }
    const jwtSecret = process.env.JWT_SECRET;
    try {
        // verify token is valid or not and return decoded header data
        const data = await jwt.verify(token, jwtSecret);
        req.userid = data.id;
		req.username = data.username;
        next();
    }
    catch (error) {
        return res.status(401).json({ 
                                error: "401",
                                mssg: "access denied - unauthorized"
                                     });
    }
}