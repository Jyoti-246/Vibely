import { Router } from "express";
import { User } from "../models/index.js";
import { clean } from "../lib/enrich.js";

const router = Router();

// GET /api/users  -> all user metadata
router.get("/", async (_req, res) => {
  const users = await User.find().lean();
  res.json(users.map(clean));
});

// GET /api/users/by-id/:id -> single
router.get("/by-id/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.json(null);
  const user = await User.findOne({ id }).lean();
  res.json(user ? clean(user) : null);
});

// GET /api/users/by-email/:email -> array
router.get("/by-email/:email", async (req, res) => {
  const users = await User.find({ email: req.params.email }).lean();
  res.json(users.map(clean));
});

// GET /api/users/by-username/:username -> array
router.get("/by-username/:username", async (req, res) => {
  const users = await User.find({ user_name: req.params.username }).lean();
  res.json(users.map(clean));
});

export default router;
