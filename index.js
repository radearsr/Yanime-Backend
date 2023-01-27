require("dotenv").config();

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const apiRoutes = require("./routes/apiRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/dashboard", adminRoutes);
app.use("/api", apiRoutes);

const port = 5000;


app.listen(port, () => {
  console.log(`http://localhost:${port}/dashboard`);
});

module.exports = app;
