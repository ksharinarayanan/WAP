const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectNameSchema = new Schema({
  name: { type: String },
});

module.exports = ProjectName = mongoose.model("ProjectName", ProjectNameSchema);
