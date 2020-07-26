const { Router } = require("express");
const router = Router();
const {
  createUsers,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

router.route("/signup").post(createUsers).get(getUsers);

router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
