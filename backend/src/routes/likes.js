import { Router } from "express";
import { Like } from "../models/index.js";
import { nextId } from "../lib/ids.js";
import { clean } from "../lib/enrich.js";

const router = Router();

// GET /api/likes -> all likes
router.get("/", async (_req, res) => {
  const likes = await Like.find().lean();
  res.json(likes.map(clean));
});

// POST /api/likes  { postId, userId }  (idempotent)
router.post("/", async (req, res) => {
  const postId = Number(req.body?.postId);
  const userId = Number(req.body?.userId);
  let row = await Like.findOne({ postId, userId });
  if (!row) {
    row = await Like.create({ id: await nextId("likes"), postId, userId });
  }
  res.status(201).json(clean(row.toObject()));
});

// DELETE /api/likes  { postId, userId }
router.delete("/", async (req, res) => {
  await Like.deleteOne({
    postId: Number(req.body?.postId),
    userId: Number(req.body?.userId),
  });
  res.json({ ok: true });
});

export default router;
