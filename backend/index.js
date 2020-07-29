const process = require("process");
require("dotenv").config();
const express = require("express");
const app = new express();
app.use(express.json());
const routes = require("./routes");
var cors = require("cors");
covidHelper = require("./util/covid/createCollection");
app.use(cors());
app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  covidHelper.createCollectionIfNotExists();
  console.log("Server started on port 3000");
});
