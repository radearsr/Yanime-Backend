const { connectToDatabase, queryDatabase }  = require("../databases/functions");

exports.insertAnimes = async (title, type) => {
  const conn = await connectToDatabase();
  const sqlString = "INSERT INTO animes (title, type) VALUES?";
  const values = [[
    [title, type]
  ]];
  const result = await queryDatabase(conn, sqlString, values);

  if (!result.insertId) {
    throw new Error("Gagal menambahkan judul anime");
  }

  return result.insertId;
};

exports.insertPosters = async (titleId, imageAddress) => {
  const conn = await connectToDatabase();
  const sqlString = "INSERT INTO posters (title_id, image) VALUES?";
  const values = [[
    [titleId, imageAddress]
  ]];
  const result = await queryDatabase(conn, sqlString, values);

  if (!result.insertId) {
    throw new Error("Gagal menambahkan poster anime");
  }

  return result.insertId;
};

exports.insertGenres = async (titleId, genres) => {
  
  const conn = await connectToDatabase();
  const sqlString = "INSERT INTO genres (title_id, name) VALUES?";
  const values = [[
    [titleId, genres]
  ]];
  const result = await queryDatabase(conn, sqlString, values);

  if (!result.insertId) {
    throw new Error("Gagal menambahkan genre anime");
  }

  return result.insertId;
};

exports.insertDescriptions = async (titleId, text) => {
  const conn = await connectToDatabase();
  const sqlString = "INSERT INTO descriptions (title_id, text) VALUES?";
  const values = [[
    [titleId, text]
  ]];
  const result = await queryDatabase(conn, sqlString, values);

  if (!result.insertId) {
    throw new Error("Gagal menambahkan descriptions anime");
  }

  return result.insertId;
};


exports.insertSources = async ({ gdrive, mp4, other }) => {
  const conn = await connectToDatabase();
  const sqlString = "INSERT INTO sources (gdrive, mp4, other) VALUES?";
  const values = [[
    [gdrive, mp4, other]
  ]];
  const result = await queryDatabase(conn, sqlString, values);
  
  if (!result.insertId) {
    throw new Error("Gagal menambahkan source anime");
  }
  
  return result.insertId;
}

exports.insertEpisodes = async (titleId, number, sourceId) => {
  const conn = await connectToDatabase();
  const sqlString = "INSERT INTO episodes (title_id, number, source_id) VALUES?";
  const values = [[
    [titleId, number, sourceId]
  ]];
  
  const result = await queryDatabase(conn, sqlString, values);
  
  if (!result.insertId) {
    throw new Error("Gagal menambahkan episode anime");
  }
}


exports.getAnimes = async () => {
  const conn = await connectToDatabase();
  const sqlString = "SELECT a.*, p.image AS poster, d.text AS descriptions, eps.jml AS episode, g.name AS genre FROM animes AS a JOIN posters AS p ON a.id = p.title_id JOIN descriptions AS d ON a.id = d.title_id JOIN genres AS g ON a.id = g.title_id LEFT JOIN (SELECT a.id AS title_id, COUNT(*) AS jml FROM animes AS a INNER JOIN episodes AS eps ON a.id = eps.title_id GROUP BY a.id) AS eps ON eps.title_id = a.id ORDER BY a.title ASC";
  const result = await queryDatabase(conn, sqlString);
  return result;
};

exports.getAnimeById = async (animeId) => {
  const conn = await connectToDatabase();
  const sqlString = "SELECT a.*, p.image AS poster, d.text as descriptions, g.name AS genre FROM animes AS a JOIN posters AS p ON a.id = p.title_id JOIN descriptions AS d ON a.id = d.title_id JOIN genres AS g ON a.id = g.title_id WHERE a.id=?";
  const values = [animeId];

  const result = await queryDatabase(conn, sqlString, values);
  return result;
};

exports.updateAnimeById = async (animeId, { title, poster, type, genre, descriptions}) => {
  const conn = await connectToDatabase();
  const sqlString = "UPDATE animes AS a INNER JOIN descriptions AS d ON a.id = d.title_id INNER JOIN posters AS p ON a.id = p.title_id INNER JOIN genres AS g SET a.title=?, a.type=?, d.text=?, p.image=?, g.name=? WHERE a.id=?";
  const values = [title, type, descriptions, poster, genre, animeId];

  const result = await queryDatabase(conn, sqlString, values);

  if (result.affectedRows < 1) {
    throw new Error("Gagal memperbarui anime");
  }
};

exports.deleteAnimeById = async (animeId) => {
  const conn = await connectToDatabase();
  const sqlString = "DELETE a FROM animes AS a INNER JOIN descriptions AS d ON a.id = d.title_id INNER JOIN posters AS p ON a.id = p.title_id WHERE a.id=?";
  const values = [animeId];

  const result = await queryDatabase(conn, sqlString, values);
  if (result.affectedRows < 1) {
    throw new Error("Gagal menghapus anime");
  }
}

exports.getEpisodes = async (animeId) => {
  const conn = await connectToDatabase();
  const sqlString = "SELECT eps.id, eps.number, src.mp4, src.gdrive, src.other FROM episodes AS eps JOIN sources AS src ON src.id = eps.source_id WHERE eps.title_id=? ORDER BY eps.number DESC";
  const values = [animeId];

  const result = await queryDatabase(conn, sqlString, values);
  return result;
};

exports.getEpisodeById = async (sourceId) => {
  const conn = await connectToDatabase();
  const sqlString = "SELECT eps.id, eps.number, src.mp4, src.gdrive, src.other FROM episodes AS eps JOIN sources AS src ON eps.source_id = src.id WHERE eps.id=?";
  const values = [sourceId];

  const result = await queryDatabase(conn, sqlString, values);
  
  return result;
}

exports.updateEpisodeById = async (episodeId, { episodeNum, mp4, gdrive, other }) => {
  const conn = await connectToDatabase();
  const sqlString = "UPDATE episodes AS eps INNER JOIN sources AS src ON eps.source_id = src.id SET eps.number=?, src.mp4=?, src.gdrive=?, src.other=? WHERE eps.id=?;";
  const values = [episodeNum, mp4, gdrive, other, episodeId];

  const result = await queryDatabase(conn, sqlString, values);
  
  if (result.affectedRows < 1) {
    throw new Error("Gagal memperbarui Episode");
  }
};

exports.deleteEpisodeById = async (episodeId) => {
  const conn = await connectToDatabase();
  const sqlString = "DELETE eps FROM episodes AS eps INNER JOIN sources AS src ON eps.source_id = src.id WHERE eps.id=?";
  const values = [episodeId];
  
  const result = await queryDatabase(conn, sqlString, values);
  if (result.affectedRows < 1) {
    throw new Error("Gagal menghapus episode")
  }
};

exports.getCurrentEpisode = async (animeId) => {
  const conn = await connectToDatabase();
  const sqlString = "SELECT (COUNT(*) + 1) AS current_eps FROM animes AS a INNER JOIN episodes AS eps ON a.id = eps.title_id WHERE a.id=?";
  const values = [animeId];

  const result = await queryDatabase(conn, sqlString, values);
  return result[0].current_eps;
}
