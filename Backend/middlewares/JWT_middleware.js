const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(403).json({
      message: "Error token, kindly login Again",
    });

  try {
    const decodeToken = jwt.verify(token, JWT_SECRET_KEY);
    if (!decodeToken) return res.json({ message: "Wrong token" });

    req.userInfo = decodeToken;
    console.log("Login successfully:", req.userInfo);
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({
      status:"failed",
      message: "Invalid or expired token"
    })
  }
};

module.exports = jwtMiddleware;
