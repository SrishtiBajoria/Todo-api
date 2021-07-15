// token generate krte h to ID hidden hti user ki usme
// Token decode b kr skte h mtlb we can fetch that payload (userID) from token

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  // Content-Type : application/json
  // x-api-key : <token>
  const token = req.header("x-api-key");
  if (!token) {
    return res.json({ message: "No Token, Authorization Denied!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.json({ message: "Token not Valid" });
  }
};
