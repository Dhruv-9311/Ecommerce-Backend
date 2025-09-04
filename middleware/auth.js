const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req,res,next) => {
    if(!req.headers.authorization){
        return res.status(401).json({message: "Unauthorized"});
    }
    
    try {
        const token = req.headers.authorization.split(" ")[1];
        
        // Check if token exists
        if (!token || token === 'null' || token === 'undefined') {
            return res.status(401).json({message: "No token provided"});
        }
        
        const {userId, userType} = jwt.verify(token, process.env.JWT_SECRET);
        req.user = userId;
        req.userType = userType;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({message: "Invalid token"});
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({message: "Token expired"});
        } else {
            return res.status(401).json({message: "Token verification failed"});
        }
    }
}
exports.isSeller = (req,res,next) => {
    if(req.userType !== "seller"){
        return res.status(401).json({message: "Unauthorized"});
    }
    next();
}
exports.isCustomer = (req,res,next) => {
    if(req.userType !== "customer"){
        return res.status(401).json({message: "Unauthorized"});
    }
    next();
}