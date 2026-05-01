import express from "express";
import { createProject, getProjects } from "../controllers/projectcontroller.js";
import { protect } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), createProject);
router.get("/", protect, getProjects);

export default router;