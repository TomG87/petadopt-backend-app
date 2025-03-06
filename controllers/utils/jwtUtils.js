const jwt = require("jsonwebtoken");
// const secretKey = "will add later"

const generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "2h" });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
