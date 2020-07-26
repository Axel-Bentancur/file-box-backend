const { Router } = require ('express');
const router = Router();

const {
    createUsers,
} = require ('../controllers/register.controller');

router.route("/").post(createUsers);

module.exports = router;