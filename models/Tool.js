const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ToolSchema = new Schema({
  name: { type: String },
  command: { type: String },
});

module.exports = Tool = mongoose.model("Tool", ToolSchema);
