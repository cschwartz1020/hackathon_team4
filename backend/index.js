const express = require("express");
const process = require("process");
const mysql = require("mysql");
require("dotenv").config();

const db = require("./config/db");
const app = new express();
const routes = require("./routes");

app.use(routes);

// app.get("/protest/example", async (req, res) => {
//   var protest = {
//     time: new Date(),
//     location: null,
//     title: "example protest title",
//     summary: "example protest summary",
//     resources: [
//       "mask",
//       "water bottles",
//       "more example items",
//       "more stuff to bring",
//     ],
//   };
//   await iplocate("184.167.25.35").then(function (results) {
//     protest.location = results;
//   });
//   res.send(protest);
// });

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
