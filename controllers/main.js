const login = async (req, res) => {
  res.send("fake login/register/signup route");
};

const dashboard = async (req, res) => {
  const number = Math.floor(Math.random() * 100);
  res
    .status(200)
    .json({ msg: "hello moutaz ali", secret: `your number is ${number}` });
};

module.exports = {
  login,
  dashboard,
};
