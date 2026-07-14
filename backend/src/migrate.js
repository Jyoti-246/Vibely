import "dotenv/config";
import fs from "node:fs";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "./db.js";
import {
  User,
  Post,
  Story,
  Message,
  Follower,
  Like,
  Comment,
} from "./models/index.js";
import { setCounterAtLeast } from "./lib/ids.js";

// Read the Supabase project URL + public anon key straight from the frontend
// file (byte-accurate) unless overridden via env.
function readSupabaseFromFrontend() {
  try {
    const txt = fs.readFileSync(
      new URL("../../services/supabase.js", import.meta.url),
      "utf8",
    );
    const url = txt.match(/supabaseUrl\s*=\s*"([^"]+)"/)?.[1];
    const key = txt.match(/"(eyJ[A-Za-z0-9._-]+)"/)?.[1];
    return { url, key };
  } catch {
    return {};
  }
}

const fromFile = readSupabaseFromFrontend();
const SUPABASE_URL = process.env.SUPABASE_URL || fromFile.url;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || fromFile.key;
// Some tables (e.g. userMetadata) have RLS that blocks the anon key, so we sign
// in as a real Supabase user to read them — the same way the app did.
const SUPABASE_LOGIN_EMAIL =
  process.env.SUPABASE_LOGIN_EMAIL || "khushi@gmail.com";
const SUPABASE_LOGIN_PASSWORD =
  process.env.SUPABASE_LOGIN_PASSWORD || "12345";

async function getAccessToken() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: SUPABASE_LOGIN_EMAIL,
          password: SUPABASE_LOGIN_PASSWORD,
        }),
      },
    );
    const data = await res.json();
    if (data.access_token) {
      console.log(`🔑 Authenticated to Supabase as ${SUPABASE_LOGIN_EMAIL}`);
      return data.access_token;
    }
    console.warn("⚠️  Supabase sign-in failed; falling back to anon key.");
  } catch {
    console.warn("⚠️  Supabase sign-in errored; falling back to anon key.");
  }
  return SUPABASE_ANON_KEY;
}

let ACCESS_TOKEN = SUPABASE_ANON_KEY;

async function fetchTable(table) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?select=*&limit=10000`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    },
  );
  if (!res.ok) throw new Error(`Failed to fetch ${table}: ${res.status}`);
  return res.json();
}

async function maxId(model) {
  const top = await model.findOne().sort({ id: -1 }).lean();
  return top?.id || 0;
}

async function run() {
  await connectDB(process.env.MONGODB_URI);

  ACCESS_TOKEN = await getAccessToken();

  const defaultPassword = process.env.MIGRATION_DEFAULT_PASSWORD || "12345";
  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  const steps = [
    { table: "userMetadata", model: User, counter: "userMetadata" },
    { table: "posts", model: Post, counter: "posts" },
    { table: "stories", model: Story, counter: "stories" },
    { table: "messages", model: Message, counter: "messages" },
    { table: "followers", model: Follower, counter: "followers" },
    { table: "likes", model: Like, counter: "likes" },
    { table: "comments", model: Comment, counter: "comments" },
  ];

  for (const { table, model, counter } of steps) {
    let rows;
    try {
      rows = await fetchTable(table);
    } catch (err) {
      console.warn(`⚠️  Skipping ${table}: ${err.message}`);
      continue;
    }

    // Give likes rows an id if Supabase didn't expose one.
    let fallback = 1;
    rows = rows.map((row) => {
      const out = { ...row };
      if (out.id == null) out.id = fallback++;
      if (table === "userMetadata") out.password = passwordHash;
      return out;
    });

    await model.deleteMany({});
    if (rows.length) await model.insertMany(rows, { ordered: false });
    await setCounterAtLeast(counter, await maxId(model));

    console.log(`✔ ${table}: ${rows.length} rows migrated`);
  }

  console.log(
    `\n✅ Migration complete. Every user's password is "${defaultPassword}".`,
  );
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
