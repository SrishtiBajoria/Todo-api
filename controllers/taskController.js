const bcrypt = require("bcryptjs");
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    var obj = {
      title: title,
      description: description,
      userID: req.user.id,
    };

    // Task Creation
    var task = new Task(obj);
    await task.save();
    res.json({ msg: "Task Saved", data: task });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getTasks = async (req, res) => {
  try {
    //   .find => returns an Array
    var tasks = await Task.find({ userID: req.user.id });
    return res.json(tasks);
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    var obj = {
      title: title,
      description: description,
    };

    var tasks = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { $set: obj },
      {
        new: true,
      }
    );
    return res.json({ msg: "Task updated" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    return res.json({ mgs: "task deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
