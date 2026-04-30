import Task from "../models/task.js";

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      assignedTo: req.user.id
    });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id });

    const stats = {
      total: tasks.length,
      completed: tasks.filter(t => t.status === "completed").length,
      pending: tasks.filter(t => t.status === "pending").length,
      overdue: tasks.filter(t => new Date(t.dueDate) < new Date()).length
    };

    res.json({ tasks, stats });
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    next(err);
  }
};