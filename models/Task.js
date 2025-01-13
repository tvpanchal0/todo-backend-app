const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // This links to the User collection
    ref: "User", // Optional: This is useful if you want to populate user data later
    required: true,
  },
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
