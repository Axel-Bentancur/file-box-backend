const { Router } = require("express");
const router = Router();
const { createbox } = require("../controllers/box.controller");

router.route("/").post(createbox);

module.exports = router;
