require("dotenv").config();

const jwt = require("jsonwebtoken");
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

  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY is missing in .env file");
  }
};

module.exports = { generateToken, verifyToken };
