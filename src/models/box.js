const { Schema, model } = require("mongoose");

const boxSchema = new Schema(
  {
    files: {
      type: Number,
      require: true,
      unique: true,
      index: { unique: true, dropDups: true },
    },
      box_number: {
      type: Number,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("boxSch", boxSchema);
