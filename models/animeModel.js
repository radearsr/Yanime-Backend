const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Anime = new Schema({
  title: String,
  poster: String,
  genre: String,
  type: String,
  description: String,
  episodes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Source",
  }],
});

module.exports = mongoose.model("Anime", Anime);
