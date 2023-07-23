const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");

const authMidware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.secretKey);

    req.userData = { userId: decodedToken.userId, role: decodedToken.role };
  } catch (error) {
    console.log("Token verification error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMidware;
