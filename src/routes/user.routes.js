const { Router } = require("express");
const router = Router();
const {
  createUsers,
  getUsers,
  updateUser,
  deleteUser,
  logIn,
  logOut,
} = require("../controllers/user.controller");

router.route("/signup").post(createUsers).get(getUsers);
router.route("/login").post(logIn);
router.route("/logout").get(logOut);

router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
