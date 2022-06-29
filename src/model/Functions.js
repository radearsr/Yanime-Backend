import { pool } from "./Pool.js";

const connectDB = () => (new Promise((resolve, reject) => {
  pool.getConnection((error, conn) => {
    if (error) reject(error);
    resolve(conn);
  });
}));

const queryDB = (connection, sqlString, escapeStrValue) => (new Promise((resolve, reject) => {
  connection.query(sqlString, escapeStrValue, (error, result) => {
    if (error) reject(error);
    connection.release();
    resolve(result);
  });
}));

export { connectDB, queryDB };
