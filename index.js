const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const animeRoutes = require("./routes/anime");
const adminRoutes = require("./routes/admin");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/anime", animeRoutes);
app.use("/", adminRoutes);

const port = 5000;

mongoose.connect("mongodb+srv://radeakui12:radeakui12@yanimecluster.rd4npbq.mongodb.net/yanime")
.then(() => {
  console.log("Berhasil connect");
})
.catch((error) => {
  console.log(error);
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
