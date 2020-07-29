const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://mongo:27017/hackathonDB", {
  keepAlive: true,
});

module.exports.Protest = require("../models/protest");
module.exports.Covid = require("../models/covid");
