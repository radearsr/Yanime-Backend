const apiServices = require("../services/ApiServices");

exports.getAnimesByTypeController = async (req, res) => {
  try {
    const { type, limit } = req.query;
    const animes = await apiServices.getAnimeByType(type, limit);
    res.json({
      status: "success",
      data: {
        animes
      },
    });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({
      status: "error",
      message: "Terjadi kegagalan pada server kami.",
    });
  }
};

exports.getDetailAnimeById = async (req, res) => {
  try {
    const { animeIdentity } = req.params;
    const animeIdentitySplited = animeIdentity.split("-");
    const [animeId, animeEps] = animeIdentitySplited; 

    const [anime] = await apiServices.getAnimeById(animeId);
    const links = await apiServices.getLinkAnime(animeId, animeEps);

    const details = Object.assign(anime, {videos: links});
    
    res.json({
      status: "success",
      data: {
        details,
      },
    });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({
      status: "error",
      message: "Terjadi kegagalan pada server kami.",
    });
  }
};

exports.getAllAnimeBySearch = async (req, res) => {
  try {
    const { q, page: activePage, perpage: perPage } = req.query;
    const totalData = await apiServices.totalResultSearch(q);
    const totalPage = Math.ceil(totalData / perPage);
    const firstData = (perPage * activePage) - perPage;
    const animes = await apiServices.getAnimeBySearch(q, parseFloat(firstData), parseFloat(perPage));
    res.json({
      status: "success",
      data: {
        pagination: totalPage,
        animes,
      },
    });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({
      status: "error",
      message: "Terjadi kegagalan pada server kami.",
    });
  }
};

exports.getAnimesForCarousel = async (req, res) => {
  try {
    const { limit } = req.params;
    const animes = await apiServices.getAnimeForCarousel(parseFloat(limit));
    res.json({
      status: "success",
      data: {
        animes,
      },
    });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({
      status: "error",
      message: "Terjadi kegagalan pada server kami",
    });
  }
};

exports.getAnimePosterController = async (req, res) => {
  try {
    const { id } = req.params;
    const poster = await apiServices.getAnimePosterById(id);
    res.json({
      status: "success",
      data: {
        poster
      },
    });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({
      status: "error",
      message: "Terjadi kegagalan pada server kami",
    });
  }
}
