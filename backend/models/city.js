const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  date: {
    type: String,
  },
  fips: {
    type: Number,
  },
  lat: {
    type: Number,
  },
  long: {
    type: Number,
  },
  confirmed: {
    type: Number,
  },
  deaths: {
    type: Number,
  },
  confirmed_diff: {
    type: Number,
  },
  deaths_diff: {
    type: Number,
  },
  last_update: {
    type: String,
  },
});

module.exports = citySchema;
