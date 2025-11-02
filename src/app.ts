import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((error) => console.error("❌ MongoDB connection error:", error));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

// API Routes
app.use("/api", postRoutes);
app.use("/api", authRoutes);

// Serve frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "admin.html"));
});

app.get("/formEntry", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "formEntry.html"));
});

app.get("/post", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "post.html"));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});