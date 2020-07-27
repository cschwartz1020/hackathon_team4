const mysql = require("mysql2/promise");

exports.createDb = async function () {
  await mysql
    .createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    })
    .then((connection) => {
      connection
        .query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
        .then((res) => {
          console.info("Database created or succesfully checked");
        });
      connection.end();
    });
};
