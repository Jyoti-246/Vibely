import { Router } from "express";
import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || "";
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => cb(null, file.mimetype.startsWith("image/")),
});

const router = Router();

// POST /api/upload  (multipart form field: "file") -> { url }
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image uploaded" });
  const base = process.env.PUBLIC_URL || `http://localhost:${process.env.PORT || 4000}`;
  res.status(201).json({ url: `${base}/uploads/${req.file.filename}` });
});

export default router;
