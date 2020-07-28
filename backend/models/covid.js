const mongoose = require("mongoose");
const Region = require("./region");

const covidSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  confirmed: {
    type: Number,
  },
  deaths: {
    type: Number,
  },
  recovered: {
    type: Number,
  },
  confirmed_diff: {
    type: Number,
  },
  deaths_diff: {
    type: Number,
  },
  recovered_diff: {
    type: Number,
  },
  recovered_diff: {
    type: Number,
  },
  last_update: {
    type: String,
  },
  active: {
    type: Number,
  },
  active_diff: {
    type: Number,
  },
  fatality_rate: {
    type: Number,
  },
  region: Region,
});

const Covid = mongoose.model("Covid", covidSchema);
module.exports = Covid;
