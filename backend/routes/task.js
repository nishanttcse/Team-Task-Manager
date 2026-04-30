import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
} from "../controllers/taskcontroller.js";

import { protect } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";

const router = express.Router();

// Admin only
router.post("/", protect, authorizeRoles("admin"), createTask);

// Both admin + member
router.get("/", protect, getTasks);

// Admin only
router.put("/:id", protect, authorizeRoles("admin"), updateTask);

export default router;