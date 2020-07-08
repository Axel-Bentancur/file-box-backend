const { Router } = require("express");
const router = Router();
const {
  getBoxnumb,
  getBoxid,
  getBoxes,
  updateBox,
  deleteBox,
  getBoxfile
} = require("../controllers/search.controller");

router.route("/boxes").get(getBoxes);
router.route("/box/:box_number").get(getBoxnumb);
router.route("/files/:files").get(getBoxfile);
router.route("/:id").put(updateBox).delete(deleteBox).get(getBoxid);

module.exports = router;
