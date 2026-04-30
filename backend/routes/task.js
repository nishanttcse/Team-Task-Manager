import express from "express";
import { createTask, getTasks, updateTask } from "../controllers/taskcontroller.js";
import { protect } from "../middleware/auth.js";
import { validateTask } from "../middleware/validate.js";

const router = express.Router();

router.post("/", protect, validateTask, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);

export default router;