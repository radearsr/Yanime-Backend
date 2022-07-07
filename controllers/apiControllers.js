const path = require("path");
const fs = require("fs");
const AnimeList = require("../models/animeModel");

const VIDEO_CONF = {
  videoPath: null,
  episode: null,
  title: null,
};

exports.getAllAnimeList = async (req, res) => {
  try {
    const { category = "" } = req.query;
    let result;

    if (category !== undefined && category !== "") {
      result = await AnimeList.find({type: { $eq: category }});
    } else {
      result = await AnimeList.find();
    }
    res.status(200).json({
      statu: "success",
      data: result,
    });
  } catch(error) {
    console.log(error);
  }
};

exports.getAllAnimeBySearch = async (req, res) => {
  try {
    const { query } = req.query;
    const result = await AnimeList.find({ title: { $regex: query, $options: "i" } });
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch(error) {
    console.log(error);
  }
};

const reformatDetailInfo = (longDetail) => {
  let titleAnime, epsAnime;
  if(longDetail.includes("eps")) {
    const longDetailSplit = longDetail.split("eps");
    const [titleSplited, epsSplited] = longDetailSplit; 
    titleAnime = titleSplited.split("-").join(" ");
    [,epsAnime] = epsSplited.split("-");
  } else {
    titleAnime = longDetail.split("-").join(" ");
    epsAnime = "1";
  }
  return [title, epsAnime];
}

exports.getDetailAnimeByTitle = async (req, res) => {
  try {
    const { detailInfo } = req.params;
    const [titleAnime] = reformatDetailInfo(detailInfo);

    const detailAnime = await AnimeList.findOne(
      {title: { 
        $regex: new RegExp(titleAnime.trim("")),
        $options: "i"
      }
    }).populate("episodes");
    res.status(200).json({
      status: "success",
      data: detailAnime,
    });
  } catch (error) {
    console.log(error);
  }
};

const getVideoPathFromDB = async (titleAnime, epsAnime) => {
  try {
    const detailAnime = await AnimeList.findOne({
      title: {
        $regex: new RegExp(titleAnime.trim("")),
        $options: "i",
      },
    }).populate("episodes");
    const filteredPath = detailAnime.episodes.filter((eps) => parseFloat(eps.episode) === parseFloat(epsAnime));
    const [videoPath] = filteredPath;
    const fullVideoPath = path.join(__dirname, "../", "assets", videoPath.path);
    return fullVideoPath;
  } catch(error) {
    return error;
  }
};

const checkSourceVideo = async (titleAnime, epsAnime) => {
  if(VIDEO_CONF.videoPath === null && VIDEO_CONF.title === null && VIDEO_CONF.episode === null) {
    VIDEO_CONF.videoPath = await getVideoPathFromDB(titleAnime, epsAnime);
    VIDEO_CONF.title = titleAnime;
    VIDEO_CONF.episode = epsAnime;
  } else if (VIDEO_CONF.title !== titleAnime || VIDEO_CONF.episode !== epsAnime) {
    VIDEO_CONF.videoPath = await getVideoPathFromDB(titleAnime, epsAnime);
    VIDEO_CONF.title = titleAnime;
    VIDEO_CONF.episode = epsAnime;
  }
}

exports.playVideoAnime = async (req, res) => {
  try {
    const { detailInfo } = req.params;
    const [titleAnime] = reformatDetailInfo(detailInfo);
    const [,epsAnime] = reformatDetailInfo(detailInfo);

    await checkSourceVideo(titleAnime, epsAnime);

    const { range } = req.headers;
  
    if (!range) {
      res.status(400).send("Require Range Header");
    }
  
    const videoSize = fs.statSync(VIDEO_CONF.videoPath).size;
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
    const videoStream = fs.createReadStream(VIDEO_CONF.videoPath, { start, end });
    videoStream.pipe(res);
  } catch (error) {
    console.log(error);
  }
};
