import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.json(project);
  } catch {
    res.status(500).json({ msg: "Error creating project" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("members");
    res.json(projects);
  } catch {
    res.status(500).json({ msg: "Error fetching projects" });
  }
};