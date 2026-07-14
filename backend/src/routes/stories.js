import { Router } from "express";
import { Story } from "../models/index.js";
import { nextId } from "../lib/ids.js";
import { enrichStories, clean } from "../lib/enrich.js";

const router = Router();

function parseIdList(str) {
  if (!str) return [];
  return String(str)
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !Number.isNaN(n));
}

// GET /api/stories?followers=1,2,3
router.get("/", async (req, res) => {
  const followers = parseIdList(req.query.followers);
  const stories = await Story.find({ userId: { $in: followers } })
    .sort({ created_at: -1 })
    .lean();
  res.json(await enrichStories(stories));
});

// POST /api/stories  { userId, storyImage }
router.post("/", async (req, res) => {
  const { userId, storyImage } = req.body || {};
  const id = await nextId("stories");
  const doc = await Story.create({
    id,
    userId: Number(userId),
    storyImage,
    created_at: new Date(),
  });
  res.status(201).json(clean(doc.toObject()));
});

// DELETE /api/stories/:id  (only the author may delete; enforced via req.user)
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(404).json({ error: "Story not found" });
  const story = await Story.findOne({ id }).lean();
  if (!story) return res.status(404).json({ error: "Story not found" });
  if (story.userId !== req.user.id)
    return res.status(403).json({ error: "You can only delete your own story" });
  await Story.deleteOne({ id });
  res.json({ ok: true });
});

export default router;
