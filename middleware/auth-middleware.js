const jwt = require('jsonwebtoken');
const User = require('../models/user-models');

const authMiddleware = async (req , res , next) => {
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({message : "Unauthorized access"});
    }

    const jwtToken = token.replace("Bearer"," ").trim();

    console.log('Token from auuth middleware:', jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        console.log(isVerified);

        const userData = await User.findOne({email: isVerified.email}).select({password:0});
        console.log(userData);

        req.user = userData;
        req.token = jwtToken;
        req.userId = userData._id;
        next();  
    } catch (error) {
        return res.status(401).json({message : "Unauthorized access"});
    }
}

module.exports = authMiddleware;