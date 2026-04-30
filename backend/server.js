import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/project.js";
import taskRoutes from "./routes/task.js";
import { errorHandler } from "./middleware/errorhandler.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.get("/", (req, res) => res.send("API Running"));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));