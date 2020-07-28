const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  location: {
    country: {
      type: String,
    },
    subdivision: {
      type: String,
    },
    city: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
});

//const Location = mongoose.model("Location", locationSchema);
module.exports = locationSchema;
