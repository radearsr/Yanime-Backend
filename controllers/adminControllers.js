const AnimeList = require("../models/animeModel");
const Source = require("../models/sourceModel");

exports.mainPage = (req, res) => {
  res.render("index", { activePage: "home" });
};

exports.addAnimeListPage = (req, res) => {
  res.render("index", { activePage: "add-anime" });
};

exports.createAnimeList = async (req, res) => {
  const {
    title,
    poster,
    genre,
    type,
    description,
  } = req.body;
  
  const NewAnimeList = new AnimeList({
    title,
    poster,
    genre,
    type,
    description,
  });
  
  NewAnimeList.save()
  .then(() => {
    res.redirect("/add-eps");
  })
  .catch((err) => {
    console.log(err);
  });
};

exports.addAnimeEpisodePage = (req, res) => {
  AnimeList.find()
  .then((result) => {
    res.render("index", { activePage: "add-eps", animes: result });
  })
  .catch((err) => {
    console.log(err);
  });
};

exports.createAnimeEpisode = (req, res) => {
  const { idAnime, episode, path } = req.body;

  console.log(idAnime);

  const NewEpisodeAnime = new Source({
    episode,
    path,
  });

  NewEpisodeAnime.save()
  .then((resultNewEps) => {
    return resultNewEps._id;
  })
  .then((idEps) => {
    return AnimeList.findByIdAndUpdate(
      idAnime,
      { $push: { episodes: idEps }},
      { new: true, useFindAndModify: false },
    );
  })
  .then((result) => {
    console.log(result);
    res.redirect("/add-eps");
  })
  .catch((err) => {
    console.log(err);
  });
}
