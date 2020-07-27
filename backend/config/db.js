const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to MySQL");
  connection.query("CREATE DATABASE IF NOT EXISTS Year2020", function (
    err,
    result
  ) {
    if (err) throw err;
  });
});

module.exports.db = connection;
