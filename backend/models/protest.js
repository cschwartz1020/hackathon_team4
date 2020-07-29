const mongoose = require("mongoose");
const Location = require("./location");

const protestSchema = new mongoose.Schema({
  time: {
    type: Date,
  },
  startLocation: [Location],
  endLocation: [Location],
  title: {
    type: String,
  },
  summary: {
    type: String,
  },
  resources: [
    {
      type: String,
    },
  ],
  attendanceCount: {
    type: Number,
  },
});

const Protest = mongoose.model("Protest", protestSchema);
module.exports.Protest = Protest;
module.exports.protestSchema = protestSchema;
