const userCtrl = {};
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

//------------------- USER/SIGNUP

userCtrl.createUsers = async (req, res) => {
  try {
    const { user, dni, password, confirm_password } = req.body;
    if (!user || !dni || !password || !confirm_password)
      return res
        .status(400)
        .json({ message: "not all fields have been entered" });
    if (password !== confirm_password)
      return res.status(400).json({ message: "password do not match" });
    if (password.length < 4)
      return res
        .status(400)
        .json({ message: "password must be at least 4 character" });
    const userDni = await userModel.findOne({ dni });
    if (userDni)
      res.status(400).json({ message: "account with that dni already exist" });

    const newUser = new userModel({
      user,
      dni,
      password,
    });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    res.json({ message: "New User created" });
  } catch (err) {
    res.status(500).json(err);
  }
};

userCtrl.getUsers = async (req, res) => {
  const users = await userModel.find();
  res.json(users);
};

//------------------- USER/SIGNIN

userCtrl.logIn = async (req, res) => {
  try {
    const { user, dni, password } = req.body;
    if (!user || !dni || !password)
      res.status(400).json({ message: "not all fields have been entered" });

    const userDni = await userModel.findOne({ dni });
    if (!userDni)
      res.status(400).json({ message: "this dni has not registered" });

    const matchPass = await bcrypt.comparePassword(password, user.password);
    if (!matchPass) res.status(400).json({ message: "invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS);
    res.json({
      token,
      user: {
        id: user._id,
        dni: user.dni,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//------------------- USER/LOGOUT

userCtrl.logOut = (req, res) => {};

//------------------- USER/:ID

userCtrl.updateUser = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  let password = user.password;
  password = await user.encryptPassword(password);
  await userModel.findByIdAndUpdate(req.params.id, { password });
  res.json(password);
};

userCtrl.deleteUser = async (req, res) => {
  await userModel.findByIdAndDelete(req.params.id);
  res.json({ message: "user deleted" });
};

module.exports = userCtrl;
