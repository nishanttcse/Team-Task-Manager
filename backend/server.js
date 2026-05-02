import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/project.js";
import taskRoutes from "./routes/task.js";
import { errorHandler } from "./middleware/errorhandler.js"; // ⚠️ FIX CASE HERE

dotenv.config();

// ✅ Connect DB safely
connectDB();

const app = express();

// ✅ CORS (works for both local + deployed)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// ✅ Health check route (IMPORTANT for Railway)
app.get("/", (req, res) => {
  res.status(200).json({ message: "API Running 🚀" });
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ Error middleware LAST
app.use(errorHandler);

// ✅ Proper PORT binding (VERY IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});