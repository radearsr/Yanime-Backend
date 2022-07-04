const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const animeRoutes = require("./routes/anime");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", animeRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
