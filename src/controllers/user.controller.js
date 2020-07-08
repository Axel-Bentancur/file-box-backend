const userCtrl = {};
const userModel = require("../models/user");

//------------------- USER/SIGNUP

userCtrl.createUsers = async (req, res) => {
  const { user, dni, password, confirm_password } = req.body;
  if (password != confirm_password) {
    res.json({ message: "password do not match" });
    res.redirect('/user/signup')     //----------------> REPLACE FOR DE REAL ROUTE
  }
  if (password.length < 4) {
    res.json({ message: "password must be at least 4 character" });
    res.redirect('/user/signup')     //----------------> REPLACE FOR DE REAL ROUTE
  }
  const nameUser = await userModel.findOne({ user });
  if (nameUser) {
    res.json({ message: "user already taken" });
    res.redirect('/user/signup')     //----------------> REPLACE FOR DE REAL ROUTE
  }
  const userDni = await userModel.findOne({ dni });
  if (userDni) {
    res.json({ message: "dni already taken" });
    res.redirect('/user/signup')     //----------------> REPLACE FOR DE REAL ROUTE
  } else {
    const newUser = new userModel({
      user,
      dni,
      password,
    });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    res.json({ message: "New User created" });
  }
};

userCtrl.getUsers = async (req, res) => {
  const users = await userModel.find();
  res.json(users);
};

//------------------- USER/SIGNIN

userCtrl.logIn = (req, res) => {};

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
