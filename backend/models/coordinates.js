const mongoose = require("mongoose");

const coordinatesSchema = new mongoose.Schema({
  NWCorner: {
    latitude: Number,
    longitude: Number,
  },
  NECorner: {
    latitude: Number,
    longitude: Number,
  },
  SWCorner: {
    latitude: Number,
    longitude: Number,
  },
  SECorner: {
    latitude: Number,
    longitude: Number,
  },
});

const Coordinates = mongoose.model("Coordinates", coordinatesSchema);

module.exports.coordinatesSchema = coordinatesSchema;
module.exports.Coordinates = Coordinates;
