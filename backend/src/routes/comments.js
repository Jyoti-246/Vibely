import { Router } from "express";
import { Comment } from "../models/index.js";
import { nextId } from "../lib/ids.js";
import { clean } from "../lib/enrich.js";

const router = Router();

// POST /api/comments  { postId, userId, commentMessage }
router.post("/", async (req, res) => {
  const { postId, userId, commentMessage } = req.body || {};
  const id = await nextId("comments");
  const doc = await Comment.create({
    id,
    postId: Number(postId),
    userId: Number(userId),
    comment: commentMessage,
    created_at: new Date(),
  });
  res.status(201).json(clean(doc.toObject()));
});

export default router;
