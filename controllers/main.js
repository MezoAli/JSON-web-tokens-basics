require("dotenv").config();
const jwt = require("jsonwebtoken");
const CustomError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomError(
      "please provide username and password",
      StatusCodes.BAD_REQUEST
    );
  }
  const id = new Date().toLocaleTimeString();

  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
  res.status(StatusCodes.OK).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const number = Math.floor(Math.random() * 100);

  const { username } = req.user;
  res
    .status(StatusCodes.OK)
    .json({ msg: `hello ${username}`, secret: `your number is ${number}` });
};

module.exports = {
  login,
  dashboard,
};
