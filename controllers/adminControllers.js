const animeService = require("../services/AnimeService");

// Render Default Page
exports.mainPage = (req, res) => {
  res.render("index", { activePage: "home" });
};

// Render page for add anime
exports.addAnimesPage = (req, res) => {
  res.render("index", { activePage: "add-anime" });
};

// Action / POST for add anime
exports.createAnimeController = async (req, res) => {
  try {
    const {
      title,
      poster,
      genre,
      type,
      description,
    } = req.body;
    
    const titleId = await animeService.insertAnimes(title, type.toLowerCase());

    await animeService.insertPosters(titleId, poster);
    await animeService.insertGenres(titleId, genre.toLowerCase());
    await animeService.insertDescriptions(titleId, description);
    res.render("index", { activePage: "add-anime" });

  } catch (error) {
    console.error(error);
    res.render("index", { activePage: "home" });
  }

};

// Render page anime lists
exports.getAnimesPage = async (req, res) => {
  try {
    const animes = await animeService.getAnimes();
    res.render("index", { activePage: "list-anime", animes });
  } catch (error) {
    console.error(error);
    res.render("index", { activePage: "home" });
  }
};

// Render Edit anime page
exports.editAnimePage = async (req, res) => {
  try {
    const { animeId } = req.params;
    const anime = await animeService.getAnimeById(animeId);
    res.render("index", { activePage: "edit-anime", anime });    
  } catch (error) {
    console.error(error);
    res.render("index", { activePage: "home" });
  }
};

// Action / POST edit anime
exports.editAnimeController = async (req, res) => {
  try {
    const { animeId } = req.params;
    await animeService.updateAnimeById(animeId, req.body);
    res.redirect("/dashboard/animes");
  } catch (error) {
    console.error(error);
    res.render("index", { activePage: "home" });
  }
};

// Action / GET delete anime
exports.deleteAnimeController = async (req, res) => {
  try {
    const { animeId } = req.params;
    await animeService.deleteAnimeById(animeId);
    res.redirect("/dashboard/animes");
  } catch (error) {
    console.error(error);
    res.render("index", { activePage: "home" }); 
  }
};

// GET data current episode to auto input field in add episode
exports.getCurrentEpisodeByIdController = async (req, res) => {
  try {
    const { animeId } = req.params;
    const episode = await animeService.getCurrentEpisode(animeId);

    res.json({
      status: "success",
      data: {
        episode
      }
    });
  } catch (error) {
    console.error(error);
    res.statusCode(500);
    res.json({
      status: "error",
      mesage: "Terjadi kegagalan pada server"
    });
  }
};

// Render page for add episode
exports.addEpisodesPage = async (req, res) => {
  try {
    const result = await animeService.getAnimes();
    res.render("index", { activePage: "add-eps", animes: result });
  } catch (error) {
    console.error(error);
    res.render("index", { activePage: "home" });  
  }
};

// Action / POST for add episode
exports.createEpisodesController = async (req, res) => {
  try {
    const { animeId, episode } = req.body;
    const sourceId = await animeService.insertSources(req.body);
    await animeService.insertEpisodes(animeId, episode, sourceId);
    res.redirect("/dashboard/episodes/add");
  } catch (error) {
    console.error(error);
    res.render("index", { activePage: "home" });  
  }
};

// Render page episodes lists
exports.getEpisodesPage = async (req, res) => {
  try {
    const { animeId } = req.params;
    const episodes = await animeService.getEpisodes(animeId);
    res.render("index", { activePage: "list-eps", episodes, animeid: animeId });
  } catch (error) {
    console.error(error);
    res.render("index", { activePage: "home" }); 
  }
};

// Render page edit episode
exports.editEpisodePage = async (req, res) => {
  try {
    const { episodeId } = req.params;
    const { animeid } = req.query;
    const episode = await animeService.getEpisodeById(episodeId);
    res.render("index", { activePage: "edit-eps", episode, animeid });
  } catch (error) {
    console.error(error);
    res.render("index", { activePage: "home" });
  }
};

// Action / POST update episode form
exports.editEpisodeController = async (req, res) => {
  try {
    const { episodeId } = req.params;
    const { animeid } = req.query;
    await animeService.updateEpisodeById(episodeId, req.body);
    res.redirect(`/dashboard/animes/${animeid}/episodes`);
  } catch (error) {
    console.error(error);
    res.render("index", { activePage: "home" });
  }
};

// Action / GET delete episode
exports.deleteEpisodeController = async (req, res) => {
  try {
    const { episodeId } = req.params;
    const { animeid } = req.query;
    await animeService.deleteEpisodeById(episodeId);
    res.redirect(`/dashboard/animes/${animeid}/episodes`);
  } catch (error) {
    console.error(error);
    res.render("index", { activePage: "home" });
  }
};
