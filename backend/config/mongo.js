const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(
  `${process.env.DB_TYPE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    keepAlive: true,
  }
);

module.exports.Article = require("../models/Article");
module.exports.Protest = require("../models/protest");
module.exports.Covid = require("../models/covid");
