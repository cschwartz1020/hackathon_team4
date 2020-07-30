require("dotenv").config();
const process = require("process");
const express = require("express");
const app = new express();
var cors = require("cors");
const routes = require("./routes");
covidHelper = require("./util/covid/createCollection");
newsHelper = require("./util/article/createCollection");
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  covidHelper.createCollectionIfNotExists();
  newsHelper.createCollectionIfNotExists();
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});
