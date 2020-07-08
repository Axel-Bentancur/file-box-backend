const searchboxCtrl = {};
const boxModel = require("../models/box");

// -------------------------    ROUTE SEARCH/BOX/:DATE

searchboxCtrl.getBoxes = async (req, res) => {
  const boxes = await boxModel.find();
  res.json(boxes);     
};

// -------------------------    ROUTE SEARCH/BOX/:BOX_NUMBER

searchboxCtrl.getBoxnumb = async (req, res) => {
  const query = req.params;
  const numb = await boxModel.find(query);
  res.json(numb);
};


//-------------------------     ROUTE SEARCH/FILES/:FILES
searchboxCtrl.getBoxfile = async (req, res) => {
  const query = req.params;
  const file = await boxModel.find(query);
  res.json(file);
};

// -------------------------    ROUTE SEARCH/:ID 

searchboxCtrl.getBoxid = async (req, res) => {
  const box = await boxModel.findById(req.params.id);
  res.json(box);
};

searchboxCtrl.updateBox = async (req, res) => {
  const { box_number, files, author } = req.body;
  await boxModel.findByIdAndUpdate(req.params.id, {
    box_number,
    files,    //-------------> DOESNT WORKS
    author,
  });
  res.json({ message: "box updated" });
};

searchboxCtrl.deleteBox = async (req, res) => {
  await boxModel.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted box" });
};

module.exports = searchboxCtrl;
