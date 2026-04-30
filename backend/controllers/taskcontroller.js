import Task from "../models/task.js";

export const createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    assignedTo: req.user.id,
  });

  res.json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user.id });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === "completed").length,
    pending: tasks.filter(t => t.status === "pending").length,
  };

  res.json({ tasks, stats });
};

export const updateTask = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};