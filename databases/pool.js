const mysql = require("mysql");

const pool = mysql.createPool({
  host: "47.254.251.95",
  user: "dbuser",
  password: "12",
  database: "yanime",
});

module.exports = { pool, mysql };
