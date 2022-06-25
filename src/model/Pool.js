import mysql, { createPool } from "mysql";

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "yanime",
});

export default mysql;
export { pool };
