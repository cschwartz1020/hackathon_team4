const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/hackathonDB", {
  keepAlive: true,
});

module.exports.Protest = require("../models/protest");
