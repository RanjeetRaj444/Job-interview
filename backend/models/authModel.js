const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, require: true },
  password: { type: String, require: true },
});

const User = mongoose.model("JobUser", userSchema);
module.exports = User;
