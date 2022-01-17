const mysql = require("mysql2");

require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  port: process.env.PORT,
  database: process.env.DATABASE,
});

db.connect();

module.exports = db;
