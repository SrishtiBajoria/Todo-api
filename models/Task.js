const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = Task = mongoose.model("task", TaskSchema);
