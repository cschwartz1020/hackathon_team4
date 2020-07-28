const mongoose = require("mongoose");
const City = require("./city");

const regionSchema = new mongoose.Schema({
  iso: {
    type: String,
  },
  name: {
    type: String,
  },
  province: {
    type: String,
  },
  lat: {
    type: Number,
  },
  long: {
    type: Number,
  },
  cities: [City],
});

module.exports = regionSchema;
