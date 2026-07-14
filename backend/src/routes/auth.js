import { Router } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
import { signToken, requireAuth } from "../middleware/auth.js";
import { nextId } from "../lib/ids.js";
import { clean } from "../lib/enrich.js";

const router = Router();

function publicUser(user) {
  return { ...clean(user), role: "authenticated" };
}

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { email, password, user_name, user_avatar } = req.body || {};
  if (!email || !password || !user_name)
    return res
      .status(400)
      .json({ error: "Name, email and password are required" });

  if (String(password).length < 4)
    return res
      .status(400)
      .json({ error: "Password must be at least 4 characters" });

  const emailTaken = await User.findOne({ email });
  if (emailTaken)
    return res
      .status(409)
      .json({ error: "An account with this email already exists" });

  const nameTaken = await User.findOne({ user_name });
  if (nameTaken)
    return res.status(409).json({ error: "That username is already taken" });

  const id = await nextId("userMetadata");
  const passwordHash = await bcrypt.hash(password, 10);
  const avatar =
    user_avatar ||
    `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(user_name)}`;

  const user = await User.create({
    id,
    email,
    password: passwordHash,
    user_name,
    user_avatar: avatar,
    created_at: new Date(),
  });

  const token = signToken(user);
  res.status(201).json({ token, user: publicUser(user.toObject()) });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const user = await User.findOne({ email }).lean();
  if (!user || !user.password)
    return res.status(401).json({ error: "Invalid email or password" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid email or password" });

  const token = signToken(user);
  res.json({ token, user: publicUser(user) });
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findOne({ id: req.user.id }).lean();
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(publicUser(user));
});

// POST /api/auth/logout  (stateless JWT — client just drops the token)
router.post("/logout", (_req, res) => res.json({ ok: true }));

export default router;
