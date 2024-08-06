const jwt = require("jsonwebtoken");
require("dotenv").config();
const authVerify = (req, res, next) => {
  const secret=process.env.JWT_SECRET
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(' ')[1]; // Remove "Bearer " prefix
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.userData = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized token", error: error.message });
  }
};

module.exports = authVerify;
