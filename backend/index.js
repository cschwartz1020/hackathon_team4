const process = require("process");
require("dotenv").config();
const express = require("express");
const app = new express();
app.use(express.json());
const routes = require("./routes");
var cors = require("cors");
app.use(cors());

app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000");
});
