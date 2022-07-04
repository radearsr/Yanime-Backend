exports.createAnimeList = (req, res) => {
  const {
    title,
    poster,
    genre,
    type,
    description,
  } = req.body;
  console.log("oi");

  console.log(req.body);
};

exports.getAllAnimeList = (req, res) => {
  console.log("Hello");
};

exports.getAnimeByTitle = (req, res) => {

};
