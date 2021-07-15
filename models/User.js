const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    min: 8,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
