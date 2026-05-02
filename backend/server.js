import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/project.js";
import taskRoutes from "./routes/task.js";
import { errorHandler } from "./middleware/errorhandler.js"; // ⚠️ fixed casing

dotenv.config();
connectDB();

const app = express();

// ✅ CORS (important for deployed frontend)

app.use(cors({
  origin: "*",   // 🔥 TEMP allow all (fix instantly)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => res.send("API Running 🚀"));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ Error middleware MUST be last
app.use(errorHandler);

// ✅ Use dynamic PORT (IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);