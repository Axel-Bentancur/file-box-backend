const boxCtrl = {};
const boxModel = require("../models/box");

boxCtrl.createbox = async (req, res) => {
  const { box_number, files, author, date } = req.body;
  const newModel = new boxModel({
    box_number,
    files,
    author,
    date
  });
  await newModel.save();
  res.json({ message: " box saved" });
};

module.exports = boxCtrl;
