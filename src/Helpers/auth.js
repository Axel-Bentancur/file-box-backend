const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      res.json({ message: "not authentication token, access denied" });

    const verified = jwt.verify(token, process.env.JWT_PASS);
    if (!verified) res.json({ message: "wrong token, authorization denied" });

    req.user = verified.id;
    next();
  } catch (err){
    res.json({ error: err.message });
  }
};

module.exports = auth;
