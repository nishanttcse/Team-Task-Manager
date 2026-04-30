import express from "express";
import { createProject, getProjects } from "../controllers/projectcontroller.js";
import { protect, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, isAdmin, createProject);
router.get("/", protect, getProjects);

export default router;