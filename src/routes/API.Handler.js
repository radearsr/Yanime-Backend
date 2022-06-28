import fs from "fs";
import path from "path";
import { connectDB, queryDB } from "../model/Functions.js";

const CURRENT_CONF = {
  status: "success",
  videoPath: null,
};

const readVideoPathFromDb = async (longTitleAnime) => {
  let titleAnime;
  let epsAnime;

  if (longTitleAnime.includes("eps")) {
    const splitLongTitleAnime = longTitleAnime.split("eps");
    titleAnime = splitLongTitleAnime[0].slice(0, -1).split("-").join(" ");
    epsAnime = splitLongTitleAnime[1].slice(1, 2);
  } else {
    titleAnime = longTitleAnime.split("-").join(" ");
    epsAnime = 1;
  }

  const firstConn = await connectDB();
  const getIdAnime = await queryDB(firstConn, "SELECT id from anime WHERE title=?", titleAnime);
  const [{ id }] = getIdAnime;

  const secondCon = await connectDB();
  const getSource = await queryDB(secondCon, "SELECT link_path FROM source WHERE id_anime=? AND episode=?", [id, parseFloat(epsAnime)]);
  const [{ link_path: linkPath }] = getSource;

  const dirname = path.resolve();
  return path.join(dirname, "src/assets", linkPath);
};

const playAnimeVideo = async (req, res) => {
  try {
    const { longTitleAnime } = req.params;

    if (CURRENT_CONF.videoPath === null) {
      CURRENT_CONF.videoPath = await readVideoPathFromDb(longTitleAnime);
    }

    const { range } = req.headers;

    if (!range) {
      res.status(400).send("Required Range Header");
    }

    const videoSize = fs.statSync(CURRENT_CONF.videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Range": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(CURRENT_CONF.videoPath, { start, end });
    videoStream.pipe(res);
  } catch (error) {
    console.log(error);
  }
};

const readAnimeDetail = async (req, res) => {
  try {
    CURRENT_CONF.videoPath = null;
    const { longTitleAnime } = req.params;
    let titleAnime;

    if (longTitleAnime.includes("eps")) {
      const splitLongTitleAnime = longTitleAnime.split("eps");
      titleAnime = splitLongTitleAnime[0].slice(0, -1).split("-").join(" ");
    } else {
      titleAnime = longTitleAnime.split("-").join(" ");
    }

    const firstConn = await connectDB();
    const getIdAnime = await queryDB(firstConn, "SELECT * from anime WHERE title=?", titleAnime);
    const [{
      id,
      title,
      poster,
      genre,
      description,
    }] = getIdAnime;

    const secondCon = await connectDB();
    const episodes = await queryDB(secondCon, "SELECT episode, link_path FROM source WHERE id_anime=?", [id]);

    const thirdCon = await connectDB();
    const [{ countEps }] = await queryDB(thirdCon, "SELECT COUNT(link_path) AS countEps FROM source WHERE id_anime=?", [id]);

    const anime = {
      id,
      title,
      poster,
      genre,
      description,
      countEps,
      episodes,
    };

    res.status(200).json({
      status: "success",
      data: anime,
    });
  } catch (error) {
    console.log(error);
  }
};

const readAllAnimeList = async (req, res) => {
  try {
    const conn = await connectDB();
    const result = await queryDB(conn, "SELECT * FROM anime", "");

    res.status(200).json({
      status: "success",
      data: [...result],
    });
  } catch (error) {
    console.log(error);
  }
};

const readAllAnimeByCategory = async (req, res) => {
  try {
    const { name } = req.query;

    const conn = await connectDB();
    const result = await queryDB(conn, "SELECT * FROM anime WHERE type=?", name);

    res.status(200).json({
      status: "success",
      data: [...result],
    });
  } catch (error) {
    console.log(error);
  }
};

const readAnimeBySearch = async (req, res) => {
  try {
    const { query } = req.query;
    const conn = await connectDB();
    const result = await queryDB(conn, `SELECT * FROM anime WHERE title LIKE '%${query}%'`);

    res.status(200).json({
      status: "success",
      data: [...result],
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  playAnimeVideo,
  readAnimeDetail,
  readAllAnimeList,
  readAllAnimeByCategory,
  readAnimeBySearch,
};
