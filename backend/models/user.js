const mongoose = require("mongoose");
const Protest = require("./protest");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  protests: [Protest.protestSchema],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
