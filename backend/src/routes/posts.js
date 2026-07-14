import { Router } from "express";
import { Post, Like, Comment } from "../models/index.js";
import { nextId } from "../lib/ids.js";
import { enrichPosts, clean } from "../lib/enrich.js";

const router = Router();

function parseIdList(str) {
  if (!str) return [];
  return String(str)
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !Number.isNaN(n));
}

// GET /api/posts?followers=1,2,3  -> feed
router.get("/", async (req, res) => {
  const followers = parseIdList(req.query.followers);
  const posts = await Post.find({ userId: { $in: followers } })
    .sort({ created_at: -1 })
    .lean();
  res.json(await enrichPosts(posts));
});

// GET /api/posts/profile/:userId
router.get("/profile/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  if (Number.isNaN(userId)) return res.json([]);
  const posts = await Post.find({ userId })
    .sort({ created_at: -1 })
    .lean();
  res.json(await enrichPosts(posts));
});

// GET /api/posts/:id  -> single active post
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(404).json({ error: "Post not found" });
  const post = await Post.findOne({ id }).lean();
  if (!post) return res.status(404).json({ error: "Post not found" });
  const [enriched] = await enrichPosts([post]);
  res.json(enriched);
});

// POST /api/posts  -> create
router.post("/", async (req, res) => {
  const { caption, image, userId } = req.body || {};
  const id = await nextId("posts");
  const doc = await Post.create({
    id,
    userId: Number(userId),
    image,
    caption,
    share: 0,
    created_at: new Date(),
  });
  res.status(201).json(clean(doc.toObject()));
});

// PATCH /api/posts/:id  -> edit (owner only)
router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(404).json({ error: "Post not found" });

  const existing = await Post.findOne({ id }).lean();
  if (!existing) return res.status(404).json({ error: "Post not found" });
  if (existing.userId !== req.user.id)
    return res.status(403).json({ error: "You can only edit your own post" });

  const { caption, image } = req.body || {};
  const update = {};
  if (caption !== undefined) update.caption = caption;
  if (image !== undefined) update.image = image;
  const doc = await Post.findOneAndUpdate({ id }, update, { new: true }).lean();
  res.json(clean(doc));
});

// DELETE /api/posts/:id  (owner only; also clears its likes/comments)
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(404).json({ error: "Post not found" });

  const existing = await Post.findOne({ id }).lean();
  if (!existing) return res.status(404).json({ error: "Post not found" });
  if (existing.userId !== req.user.id)
    return res.status(403).json({ error: "You can only delete your own post" });

  await Post.deleteOne({ id });
  await Like.deleteMany({ postId: id });
  await Comment.deleteMany({ postId: id });
  res.json({ ok: true });
});

export default router;
