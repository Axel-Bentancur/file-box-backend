const { Router } = require ('express');
const router = Router();
const auth = require ('../Helpers/auth')

const {
    validToken,
    logIn,
    session
} = require ('../controllers/lobby.controller');

router.route("/tokenIsValid").post(validToken);
router.route("/").post(logIn).get(auth, session);

module.exports = router;