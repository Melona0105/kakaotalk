const mysql = require("mysql");
require("dotenv").config();

export const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
});
