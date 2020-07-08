//Requirements
const express = require("express");
const cors = require("cors");

//Initializations
const app = express();

//Settings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/user", require("./routes/user.routes"));
app.use("/box", require("./routes/box.routes"));
app.use("/search", require("./routes/search.routes"));
//Exports
module.exports = app;
