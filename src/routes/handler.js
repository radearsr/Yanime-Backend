import { connectDB, queryDB } from "../model/Functions.js";

const createAnimeList = async (req, res) => {
  try {
    const {
      title,
      poster,
      genre,
      type,
      totalEps,
      description,
    } = req.body;

    const queryStr = "INSERT INTO anime (title, poster, genre, type, total_eps, description) VALUES ?";
    const escValue = [
      [
        [
          title,
          poster,
          genre,
          type,
          totalEps,
          description,
        ],
      ],
    ];

    const conn = await connectDB();
    await queryDB(conn, queryStr, escValue);
    res.redirect("/add-anime");
  } catch (error) {
    console.log(error);
  }
};

const readAllAnime = async (response) => {
  try {
    const conn = await connectDB();
    const result = await queryDB(conn, "SELECT * FROM anime", "");
    response.render("index", { activePage: "all-anime", animes: result });
  } catch (error) {
    console.log(error);
  }
};

const readDetailAnimeById = async (request, response) => {
  try {
    const { id } = request.params;

    const conn = await connectDB();
    const result = await queryDB(conn, "SELECT * FROM anime WHERE id=?", [id]);

    response.render("index", { activePage: "edit-anime", animes: result });
  } catch (error) {
    console.log(error);
  }
};

const editDetailAnimeById = async (request, response) => {
  try {
    const { id } = request.params;

    const {
      title,
      poster,
      genre,
      type,
      totalEps,
      description,
    } = request.body;

    const editVal = [{
      title,
      poster,
      genre,
      type,
      total_eps: totalEps,
      description,
    }, [id]];

    const conn = await connectDB();
    await queryDB(conn, "UPDATE anime SET ? WHERE id=?", editVal);

    response.redirect("/all-anime");
  } catch (error) {
    console.log(error);
  }
};

const deleteDetailAnimeById = async (request, response) => {
  try {
    const { id } = request.params;

    const conn = await connectDB();
    await queryDB(conn, "DELETE FROM anime WHERE id=?", [id]);

    response.redirect("/all-anime");
  } catch (error) {
    console.log(error);
  }
};

const createNewEps = async (request, response) => {
  try {
    const {
      idAnime,
      totalEps,
      type,
      withZero,
      genPathName,
    } = request.body;

    const insertVal = [[]];

    if (type === "series") {
      for (let eps = 1; eps < totalEps; eps += 1) {
        let videoEps;

        if (withZero) {
          videoEps = eps < 10 ? `0${eps}` : eps;
        } else {
          videoEps = eps;
        }

        insertVal[0].push([parseFloat(idAnime), eps, `${genPathName}${videoEps}.mp4`]);
      }
    } else {
      insertVal[0].push([parseFloat(idAnime), parseFloat(totalEps), `${genPathName}.mp4`]);
    }

    const conn = await connectDB();
    await queryDB(conn, "INSERT INTO source (id_anime, episode, link_path) VALUES ?", insertVal);

    response.redirect("/add-eps");
  } catch (error) {
    console.log(error);
  }
};

const readAllEps = async (request, response) => {
  try {
    const { id } = request.params;

    const conn = await connectDB();
    const result = await queryDB(conn, "SELECT * FROM source WHERE id_anime=?", [id]);
    response.render("index", { activePage: "all-eps", data: result });
  } catch (error) {
    console.log(error);
  }
};

const readEpsById = async (request, response) => {
  try {
    const { id } = request.params;

    const conn = await connectDB();
    const result = await queryDB(conn, "SELECT * FROM source WHERE id=?", [id]);
    response.render("index", { activePage: "edit-eps", sources: result });
  } catch (error) {
    console.log(error);
  }
};

const editEpsById = async (request, response) => {
  try {
    const { id } = request.params;
    const { episode, linkPath, idAnime } = request.body;

    const editVal = [{
      id_anime: idAnime,
      episode,
      link_path: linkPath,
    }, [id]];

    const conn = await connectDB();
    await queryDB(conn, "UPDATE source SET ? WHERE id=?", editVal);
    response.redirect(`/all-eps/${idAnime}`);
  } catch (error) {
    console.log(error);
  }
};

const deleteEpsById = async (request, response) => {
  try {
    const { id } = request.params;
    const { "id-list": idList } = request.query;

    const conn = await connectDB();
    await queryDB(conn, "DELETE FROM source WHERE id=?", [id]);
    response.redirect(`/all-eps/${idList}`);
  } catch (error) {
    console.log(error);
  }
};

const readIdAndTitleAnime = async () => {
  try {
    const conn = await connectDB();
    const result = await queryDB(conn, "SELECT id, title FROM anime", "");
    return result;
  } catch (error) {
    return error;
  }
};

export {
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
};
