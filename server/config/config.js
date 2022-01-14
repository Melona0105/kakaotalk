require("dotenv").config();

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: "kakaotalk",
    host: process.env.HOST,
    // port: process.env.AWS_PORT,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
