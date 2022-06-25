import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {
  createAnimeList,
  readAllAnime,
  readDetailAnimeById,
  editDetailAnimeById,
  deleteDetailAnimeById,
  createNewEps,
  readAllEps,
  readEpsById,
  editEpsById,
  deleteEpsById,
  readIdAndTitleAnime,
} from "./routes/handler.js";

import {
  playAnimeVideo,
  readAnimeDetail,
  readAllAnimeList,
} from "./routes/API.Handler.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.get("/anime/:longTitleAnime", (req, res) => {
  readAnimeDetail(req, res);
});

app.get("/anime", (req, res) => {
  readAllAnimeList(req, res);
});

app.get("/video/:longTitleAnime", (req, res) => {
  playAnimeVideo(req, res);
});

app.get("/", (req, res) => {
  res.render("index", { activePage: "home" });
});

app.get("/add-anime", (req, res) => {
  res.render("index", { activePage: "add-anime" });
});

app.post("/add-anime", (req, res) => {
  createAnimeList(req, res);
});

app.get("/all-anime", (req, res) => {
  readAllAnime(res);
});

app.get("/anime-detail/:id", (req, res) => {
  readDetailAnimeById(req, res);
});

app.post("/anime-detail/:id", (req, res) => {
  editDetailAnimeById(req, res);
});

app.get("/anime-del/:id", (req, res) => {
  deleteDetailAnimeById(req, res);
});

app.get("/add-eps", (req, res) => {
  const getdata = async () => {
    const result = await readIdAndTitleAnime();
    res.render("index", { activePage: "add-eps", animes: result });
  };
  getdata();
});

app.post("/add-eps", (req, res) => {
  createNewEps(req, res);
});

app.get("/all-eps/:id", (req, res) => {
  readAllEps(req, res);
});

app.get("/eps-detail/:id", (req, res) => {
  readEpsById(req, res);
});

app.post("/eps-detail/:id", (req, res) => {
  editEpsById(req, res);
});

app.get("/eps-del/:id", (req, res) => {
  deleteEpsById(req, res);
});

app.listen(5000, () => {
  console.log("http://localhost:5000");
});
