const registerCtrl = {};
const userModel = require("../models/user");
const bcrypt = require("bcryptjs");

//------------------- USER/SIGNUP

registerCtrl.createUsers = async (req, res) => {
  try {
    const { user, dni, password, confirm_password } = req.body;
    if (!user || !dni || !password || !confirm_password)
      return res.json({ message: "not all fields have been entered" });
    if (password !== confirm_password)
      return res.json({ message: "password do not match" });
    if (password.length < 4)
      return res.json({ message: "password must be at least 4 character" });

    const userDni = await userModel.findOne({ dni });
    if (userDni) res.json({ message: "account with that dni already exist" });

    const newUser = new userModel({
      user,
      dni,
      password,
    });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.json({ message: "New User created" });
  } catch (err) {
    res.json(err);
  }
};

module.exports = registerCtrl;
