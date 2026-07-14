import "dotenv/config";
import "express-async-errors"; // route errors reach the error handler instead of crashing
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { connectDB } from "./src/db.js";
import { requireAuth } from "./src/middleware/auth.js";

import authRoutes from "./src/routes/auth.js";
import usersRoutes from "./src/routes/users.js";
import postsRoutes from "./src/routes/posts.js";
import storiesRoutes from "./src/routes/stories.js";
import messagesRoutes from "./src/routes/messages.js";
import followersRoutes from "./src/routes/followers.js";
import likesRoutes from "./src/routes/likes.js";
import commentsRoutes from "./src/routes/comments.js";
import uploadRoutes from "./src/routes/upload.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/health", (_req, res) => res.json({ ok: true }));

// Auth (login is public; /me is guarded inside the router)
app.use("/api/auth", authRoutes);

// Everything else requires a valid JWT
app.use("/api/users", requireAuth, usersRoutes);
app.use("/api/posts", requireAuth, postsRoutes);
app.use("/api/stories", requireAuth, storiesRoutes);
app.use("/api/messages", requireAuth, messagesRoutes);
app.use("/api/followers", requireAuth, followersRoutes);
app.use("/api/likes", requireAuth, likesRoutes);
app.use("/api/comments", requireAuth, commentsRoutes);
app.use("/api/upload", requireAuth, uploadRoutes);

// Central error handler so thrown errors become clean JSON
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Server error" });
});

// Last-resort safety nets so a stray error can never take the server down.
process.on("unhandledRejection", (err) =>
  console.error("unhandledRejection:", err),
);
process.on("uncaughtException", (err) =>
  console.error("uncaughtException:", err),
);

const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 API on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to start:", err.message);
    process.exit(1);
  });
