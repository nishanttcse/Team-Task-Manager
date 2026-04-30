import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  dueDate: Date,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }
});

export default mongoose.model("Task", taskSchema);