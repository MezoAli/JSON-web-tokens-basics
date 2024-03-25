require("dotenv").config();
const jwt = require("jsonwebtoken");
const CustomError = require("../errors/custom-error");
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomError("please provide username and password", 400);
  }
  const id = new Date().toLocaleTimeString();

  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const { authorization } = req.headers;
  const [_, token] = authorization.split(" ");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new CustomError("no token found", 401);
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const number = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `hello ${data.username}`,
      secret: `your number is ${number}`,
    });
  } catch (error) {
    throw new CustomError("not authorized to access that route data", 401);
  }
};

module.exports = {
  login,
  dashboard,
};
