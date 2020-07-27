const express = require("express");
const process = require("process");
const mysql = require("mysql");
require("dotenv").config();
const iplocate = require("node-iplocate");

const app = new express();
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "testDB",
});

app.get("/protest/example", async (req, res) => {
  var protest = {
    time: new Date(),
    location: null,
    title: "example protest title",
    summary: "example protest summary",
    resources: [
      "mask",
      "water bottles",
      "more example items",
      "more stuff to bring",
    ],
  };
  await iplocate("184.167.25.35").then(function (results) {
    protest.location = results;
  });
  res.send(protest);
});

app.get("/meta", (req, res) => {
  db.query("describe Test_Table", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500);
    }
    res.send(results);
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
