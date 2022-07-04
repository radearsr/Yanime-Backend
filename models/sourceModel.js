const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Source = new Schema({
  episode: String,
  path: String,
});

module.exports = mongoose.model("Source", Source);
 