const userCtrl = {};
const userModel = require("../models/user");



userCtrl.getUsers = async (req, res) => {
  const users = await userModel.find();
  res.json(users);
};


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
