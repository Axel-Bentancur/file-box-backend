const mongoose = require("mongoose");

const { MONGO_HOST, MONGO_DB } = process.env;
const URI = `mongodb://${MONGO_HOST}/${MONGO_DB}`;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("database connected");
});
