
const User =require('../models/kullaniciModel')
const jwt = require('jsonwebtoken')
const protectRoute = async (req,res,next) =>{
    try {
        const token =req.cookies.jwt;
        
        if(!token) return res.status(401).json({message:"Unauthorized"});

        const decoded = jwt.verify(token,process.env.JWT_SECRET); //tokeni doğruluyoruz token doğru ise içindeki bilgileri decodeda atıyoruz
        
        const user = await User.findById(decoded.userId).select("-password");

        req.user= user;

        next();

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in loginUser: ", error.message); 
    }
}

module.exports =protectRoute;