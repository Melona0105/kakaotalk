const mysql = require("mysql2");

require("dotenv").config();

// const db = mysql.createConnection({
//   host: process.env.RDS_HOSTNAME,
//   user: process.env.RDS_USERNAME,
//   password: process.env.RDS_PASSWORD,
//   port: process.env.RDS_PORT,
//   database: process.env.RDS_DATABASE,
//   ssl: "Amazon RDS",
// });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.LOCAL_PASSWORD,
  port: process.env.LOCAL_PORT,
  database: process.env.LOCAL_DATABASE,
});

db.connect();

module.exports = db;
