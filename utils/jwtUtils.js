const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "2h" });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return null;
  }
};

module.exports = { generateToken, verifyToken };
