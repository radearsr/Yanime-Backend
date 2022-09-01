require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const apiRoutes = require("./routes/api");
const adminRoutes = require("./routes/admin");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", adminRoutes);
app.use("/api", apiRoutes);

const port = 5000;

let dbUrl;
if (process.env.NODE_ENV === "production") {
  dbUrl = process.env.DB_PROD;  
} else {
  dbUrl = process.env.DB_DEV;
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
