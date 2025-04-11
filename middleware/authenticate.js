const { verifyToken } = require("../utils/jwtUtils");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(500).json({ error: "Authentication failed" });
  }
};

module.exports = authenticate;
