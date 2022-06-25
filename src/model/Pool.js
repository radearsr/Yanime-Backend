import mysql, { createPool } from "mysql";

let config;

if (process.env.NODE_ENV === "production") {
  config = {
    host: "sql3.freemysqlhosting.net",
    database: "sql3502084",
    user: "sql3502084",
    password: "SdIbNLGg6q",
  };
} else {
  config = {
    host: "localhost",
    database: "yanime",
    user: "root",
    password: "",
  };
}

const pool = createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  ...config,
});

export default mysql;
export { pool };
