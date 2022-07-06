const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const apiRoutes = require("./routes/api");
const adminRoutes = require("./routes/admin");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", adminRoutes);
app.use("/api", apiRoutes);

const port = 5000;

let dbUrl;
if (process.env.NODE_ENV === "production") {
  dbUrl = "mongodb+srv://radeakui12:radeakui12@yanimecluster.rd4npbq.mongodb.net/yanime";
} else {
  dbUrl = "mongodb://localhost:27017/yanime";
}

mongoose.connect(dbUrl)
.then(() => {
  console.log("Berhasil connect");
})
.catch((error) => {
  console.log(error);
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
