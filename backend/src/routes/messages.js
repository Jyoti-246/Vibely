import { Router } from "express";
import { Message } from "../models/index.js";
import { nextId } from "../lib/ids.js";
import { enrichMessages, clean } from "../lib/enrich.js";

const router = Router();

// GET /api/messages/unseen/:userId
router.get("/unseen/:userId", async (req, res) => {
  const toUser = Number(req.params.userId);
  if (Number.isNaN(toUser)) return res.json([]);
  const messages = await Message.find({ toUser, seen_time: null }).lean();
  res.json(messages.map(clean));
});

// GET /api/messages/conversations/:userId
// Latest message per conversation partner (replaces the get_latest_conversations RPC).
router.get("/conversations/:userId", async (req, res) => {
  const uid = Number(req.params.userId);
  if (Number.isNaN(uid)) return res.json([]);
  const latest = await Message.aggregate([
    { $match: { $or: [{ fromUser: uid }, { toUser: uid }] } },
    { $sort: { created_at: -1 } },
    {
      $group: {
        _id: {
          $cond: [{ $eq: ["$fromUser", uid] }, "$toUser", "$fromUser"],
        },
        doc: { $first: "$$ROOT" },
      },
    },
    { $replaceRoot: { newRoot: "$doc" } },
    { $sort: { created_at: -1 } },
  ]);
  res.json(await enrichMessages(latest));
});

// GET /api/messages/chat?userId=&chatUserId=
router.get("/chat", async (req, res) => {
  const userId = Number(req.query.userId);
  const chatUserId = Number(req.query.chatUserId);
  if (Number.isNaN(userId) || Number.isNaN(chatUserId)) return res.json([]);
  const messages = await Message.find({
    $or: [
      { fromUser: userId, toUser: chatUserId },
      { fromUser: chatUserId, toUser: userId },
    ],
  })
    .sort({ created_at: 1 })
    .lean();
  res.json(await enrichMessages(messages));
});

// POST /api/messages  { fromUser, toUser, message }
router.post("/", async (req, res) => {
  const { fromUser, toUser, message } = req.body || {};
  const id = await nextId("messages");
  const doc = await Message.create({
    id,
    fromUser: Number(fromUser),
    toUser: Number(toUser),
    message,
    seen_time: null,
    created_at: new Date(),
  });
  res.status(201).json(clean(doc.toObject()));
});

// PATCH /api/messages/seen  { fromUser, toUser }
router.patch("/seen", async (req, res) => {
  const { fromUser, toUser } = req.body || {};
  await Message.updateMany(
    { fromUser: Number(fromUser), toUser: Number(toUser), seen_time: null },
    { seen_time: new Date() },
  );
  res.json({ ok: true });
});

export default router;
