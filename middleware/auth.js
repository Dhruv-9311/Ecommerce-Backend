const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req,res,next) => {
    if(!req.headers.authorization){
        return res.status(401).json({message: "Unauthorized"});
    }
    const token = req.headers.authorization.split(" ")[1];
    const {userId, userType} = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userId;
    req.userType = userType;
    next();
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