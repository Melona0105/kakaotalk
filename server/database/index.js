const mysql = require("mysql2");

require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.LOCAL_PASSWORD,
  port: process.env.LOCAL_PORT,
  database: process.env.LOCAL_DATABASE,
});

db.connect();

module.exports = db;
