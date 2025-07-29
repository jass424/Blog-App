const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/usermodel')
dotenv.config();

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; // ✅ extract bearer token

    if (!token) {
      return res.status(401).json({
        message: 'User not authenticated',
        success: false,
      });
    }
    console.log('Auth header:', req.header('Authorization'));
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
     const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found', success: false });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Auth middleware error:", error.message);
    return res.status(401).json({
      message: 'Invalid token',
      success: false,
    });
  }
};

module.exports = isAuthenticated;
