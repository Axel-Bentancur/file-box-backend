const { Router } = require ('express');
const router = Router();

const {
    validToken,
    logIn,
    session
} = require ('../controllers/lobby.controller');

router.route("/tokenIsValid").post(validToken);
router.route("/").post(logIn).get(session);

module.exports = router;