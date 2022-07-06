const AnimeList = require("../models/animeModel");
const Source = require("../models/sourceModel");

exports.mainPage = (req, res) => {
  res.render("index", { activePage: "home" });
};

exports.addAnimeListPage = (req, res) => {
  res.render("index", { activePage: "add-anime" });
};

exports.createAnimeList = async (req, res) => {
  try {
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

    await NewAnimeList.save();
    res.redirect("/add-src");
  } catch(error) {
    console.log(error);
  }
};

exports.getAnimeListById = async (req, res) => {
  try{
    const { animeId } = req.params;
    const result = await AnimeList.findById(animeId);
    res.render("index", { activePage: "edit-anime", animes: [result] });
  } catch(error) {
    console.log(error);
  }
};

exports.editAnimeListById = async (req, res) => {
  try{
    const { animeId } = req.params;
    const {
      title,
      poster,
      genre,
      type,
      description,
    } = req.body;
    const updateVal = {
      title,
      poster,
      genre,
      type,
      description,
    };
    await AnimeList.findByIdAndUpdate(animeId, updateVal);
    res.redirect("/list-anime");
  } catch(error) {
    console.log(error);
  }
};

exports.delAnimeListById = async (req, res) => {
  const { animeId } = req.params;
  await AnimeList.findByIdAndRemove(animeId);
  res.redirect("/list-anime");
};

exports.getAllAnimeList = async (req, res) => {
  try {
    const result = await AnimeList.find();
    res.render("index", {activePage: "list-anime", animes: result});

  } catch (error) {
    console.log(error);
  };
};

exports.getAllAnimeSource = async (req, res) => {
  try {
    const { animeId } = req.params;
    const result = await AnimeList.findById(animeId).populate("episodes");
    res.render("index", { activePage: "list-src", datas: result.episodes, listId: animeId });
  } catch (error) {
    console.log(error);
  }
};

exports.addAnimeSourcePage = async (req, res) => {
  try {
    const result = await AnimeList.find();
    res.render("index", { activePage: "add-src", animes: result });
  } catch(error) {
    console.log(error);
  }
};

exports.createAnimeSource = async (req, res) => {
  try {
    const { animeId, episode, path } = req.body;
    const NewAnimeSource = new Source({
      episode,
      path,
    });
    
    const animeSource = await NewAnimeSource.save();
    const result = await AnimeList.findByIdAndUpdate(
      animeId,
      { $push: { episodes: animeSource._id } },
      { new: true,  useFindAndModify: false },
    );
    res.redirect("/add-src");
  } catch(error) {
    console.log(error);
  }
};

exports.getAnimeSourceById = async (req, res) => {
  try {
    const { sourceId } = req.params;
    const { "list-id" : listId } = req.query;
    const result = await Source.findById(sourceId);
    res.render("index", { activePage: "edit-src", sources: [result], listId });
  } catch (error) {
    console.log(error);
  }
};

exports.editAnimeSourceById = async (req, res) => {
  try {
    const { sourceId } = req.params;
    const { "list-id" : listId } = req.query;

    const {
      episode,
      path,
    } = req.body;
    const updateVal = {
      episode,
      path,
    };
    await Source.findByIdAndUpdate(sourceId, updateVal);
    res.redirect(`/list-src/${listId}`);
  } catch(error) {
    console.log(error);
  }
};

exports.delAnimeSourceById = async (req, res) => {
  try {
    const { sourceId } = req.params;
    const { "list-id" : listId } = req.query;
    await Source.findByIdAndRemove(sourceId);
    res.redirect(`/list-src/${listId}`);
  } catch(error) {
    console.log(error);
  }
};
