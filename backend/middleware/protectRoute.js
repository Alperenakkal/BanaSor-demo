const User = require('../models/kullaniciModel');
const jwt = require('jsonwebtoken');

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;

    next();

  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in protectRoute: ", error.message);
  }
}

module.exports = protectRoute;
