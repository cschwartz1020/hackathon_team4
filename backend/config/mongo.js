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
module.exports.Protest = require("../models/protest").Protest;
module.exports.Covid = require("../models/covid");
module.exports.User = require("../models/user");
