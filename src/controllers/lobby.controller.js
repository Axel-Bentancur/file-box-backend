const lobbyCtrl = {};
const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../Helpers/auth");

//------------------- USER/SIGNIN

lobbyCtrl.logIn = async (req, res) => {
  try {
    let { user, dni, password } = req.body;
    if (!user || !dni || !password)
      res.json({ message: "not all fields have been entered" });

    const userDni = await userModel.findOne({ dni });
    if (!userDni) res.json({ message: "this dni has not registered" });

    const validPass = await bcrypt.compare(password, userDni.password);
    if (!validPass) res.json({ message: "wrong pass" });

    const token = jwt.sign({ id: userDni._id }, process.env.JWT_PASS);
    res.json({
      token,
      id: userDni._id,
      user: userDni.user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//------------------- VALIDATE TOKEN

lobbyCtrl.validToken = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_PASS);
    if (!verified) return res.json(false);

    const user = await userModel.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json(err);
  }
};

//------------------- SESSION

lobbyCtrl.session = async (req, res) => {
  const user = await userModel.findById(req.user);
  res.json({
    user: user.dni,
    id: user._id,
  });
};

module.exports = lobbyCtrl;
