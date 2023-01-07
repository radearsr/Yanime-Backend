const { connectToDatabase, queryDatabase }  = require("../databases/functions");

exports.getAnimeByType = async (type, limit) => {
  const conn = await connectToDatabase();
  const sqlString = `SELECT a.id, a.title, a.type, p.image AS poster FROM animes AS a JOIN posters AS p ON a.id = p.title_id WHERE a.type=? LIMIT ?`;
  const values = [type, parseFloat(limit)];
  const result = await queryDatabase(conn, sqlString, values);
  return result;
};

exports.getAnimeById = async (animeId) => {
  const conn = await connectToDatabase();
  const sqlString = "SELECT a.id, a.title, a.type, d.text AS descriptions, dtl.eps_count, p.image AS poster FROM animes AS a JOIN descriptions AS d ON a.id = d.title_id JOIN posters AS p ON a.id = p.title_id LEFT JOIN (SELECT a.id, COUNT(*) AS eps_count FROM animes AS a INNER JOIN episodes AS eps WHERE a.id = eps.title_id GROUP BY a.id) AS dtl ON a.id = dtl.id WHERE a.id=?";
  const values = [animeId];
  const result = await queryDatabase(conn, sqlString, values);
  return result;
};

exports.getLinkAnime = async (animeId, episode) => {
  const conn = await connectToDatabase();
  const sqlString = "SELECT src.* FROM episodes AS eps JOIN sources AS src ON eps.source_id = src.id WHERE eps.title_id=? AND eps.number=?";
  const values = [animeId, episode];
  const result = await queryDatabase(conn, sqlString, values);
  return result;
};

exports.totalResultSearch = async (keyword) => {
  const conn = await connectToDatabase();
  const sqlString = `SELECT COUNT(*) AS total_anime FROM animes WHERE title LIKE '%${keyword}%'`;
  const result = await queryDatabase(conn, sqlString);
  const [{total_anime: totalAnime}] =  result;
  return totalAnime; 
};

exports.getAnimeBySearch = async (keyword, selectStart, selectEnd) => {
  const conn = await connectToDatabase();
  const sqlString = `SELECT a.title, a.type, g.name AS genre, p.image AS poster, eps.jml AS episode FROM animes AS a JOIN genres AS g ON a.id = g.title_id JOIN posters AS p ON a.id = p.title_id LEFT JOIN (SELECT a.id, COUNT(*) AS jml FROM animes AS a INNER JOIN episodes AS eps WHERE a.id = eps.title_id GROUP BY a.id) AS eps ON a.id = eps.id WHERE a.title LIKE '%${keyword}%' ORDER BY a.title ASC LIMIT ${selectStart}, ${selectEnd}`;
  const result = await queryDatabase(conn, sqlString);
  return result;
};

exports.getAnimeForCarousel = async (limit) => {
  const conn = await connectToDatabase();
  const sqlString = "SELECT a.title, a.type, d.text AS descriptions, p.image AS poster FROM animes AS a JOIN descriptions AS d ON a.id = d.title_id JOIN posters AS p ON a.id = p.title_id LIMIT ?";
  const values = [limit];
  const result = await queryDatabase(conn, sqlString, values);
  return result;
};

exports.getAnimePosterById = async (id) => {
  const conn = await connectToDatabase();
  const sqlString = "SELECT image FROM posters WHERE title_id=?";
  const values = [id];
  const result = await queryDatabase(conn, sqlString, values);
  return result;
};

