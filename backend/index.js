const process = require("process");
require("dotenv").config();
const util = require("./util/createDb");
util.createDb();
const express = require("express");
const db = require("./config/db");
db.sequelize.sync();
const app = new express();
app.use(express.json());
const routes = require("./routes");

app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000");
});
