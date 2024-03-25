require("dotenv").config();
const jwt = require("jsonwebtoken");
const CustomError = require("../errors/custom-error");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  const [_, token] = authorization.split(" ");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new CustomError("no token found", 401);
  }
  try {
    const { username, id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      username,
      id,
    };
    next();
  } catch (error) {
    throw new CustomError("not authorized to access that route data", 401);
  }
};

module.exports = authMiddleware;
