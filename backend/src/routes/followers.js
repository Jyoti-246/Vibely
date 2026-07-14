import { Router } from "express";
import { Follower } from "../models/index.js";
import { nextId } from "../lib/ids.js";
import { clean } from "../lib/enrich.js";

const router = Router();

// GET /api/followers/all/:userId -> rows where user is follower OR following
router.get("/all/:userId", async (req, res) => {
  const uid = Number(req.params.userId);
  if (Number.isNaN(uid)) return res.json([]);
  const rows = await Follower.find({
    $or: [{ followingId: uid }, { followerId: uid }],
  }).lean();
  res.json(rows.map(clean));
});

// GET /api/followers/specific?user=&request=
router.get("/specific", async (req, res) => {
  const user = Number(req.query.user);
  const request = Number(req.query.request);
  if (!user || !request) return res.json(null);
  const row = await Follower.findOne({
    followingId: user,
    followerId: request,
  }).lean();
  res.json(row ? clean(row) : null);
});

// GET /api/followers/profile?userId=&title=&status=
// title "follower" -> match followerId=userId, return {followingId}
// title "following" -> match followingId=userId, return {followerId}
router.get("/profile", async (req, res) => {
  const userId = Number(req.query.userId);
  const { title, status } = req.query;
  if (Number.isNaN(userId)) return res.json([]);
  let rows = [];
  if (title === "follower") {
    rows = await Follower.find({ followerId: userId, status }).lean();
    return res.json(rows.map((r) => ({ followingId: r.followingId })));
  }
  if (title === "following") {
    rows = await Follower.find({ followingId: userId, status }).lean();
    return res.json(rows.map((r) => ({ followerId: r.followerId })));
  }
  res.json([]);
});

// GET /api/followers/accepted/:userId -> array of connected user ids (incl. self)
router.get("/accepted/:userId", async (req, res) => {
  const uid = Number(req.params.userId);
  if (Number.isNaN(uid)) return res.json([]);
  const rows = await Follower.find({
    followingId: uid,
    status: "accepted",
  }).lean();
  const ids = new Set();
  rows.forEach((r) => {
    if (r.followerId !== uid) ids.add(r.followerId);
  });
  ids.add(uid);
  res.json([...ids]);
});

// POST /api/followers  (upsert on followerId+followingId)
router.post("/", async (req, res) => {
  const { followerId, followingId, status = "requested" } = req.body || {};
  const match = {
    followerId: Number(followerId),
    followingId: Number(followingId),
  };
  let row = await Follower.findOne(match);
  if (row) {
    row.status = status;
    await row.save();
  } else {
    row = await Follower.create({ id: await nextId("followers"), ...match, status });
  }
  res.status(201).json(clean(row.toObject()));
});

// PATCH /api/followers  { followerId, followingId, status }
router.patch("/", async (req, res) => {
  const { followerId, followingId, status } = req.body || {};
  const row = await Follower.findOneAndUpdate(
    { followerId: Number(followerId), followingId: Number(followingId) },
    { status },
    { new: true },
  ).lean();
  res.json(row ? clean(row) : null);
});

// DELETE /api/followers  { followerId, followingId }
router.delete("/", async (req, res) => {
  const { followerId, followingId } = req.body || {};
  await Follower.deleteOne({
    followerId: Number(followerId),
    followingId: Number(followingId),
  });
  res.json({ ok: true });
});

export default router;
