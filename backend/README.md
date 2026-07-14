# Vibely Backend (Node.js + Express + MongoDB)

Replaces the Supabase backend. Provides JWT auth, all data collections, the
relational joins the UI expects, the conversations aggregation, and image
uploads.

## Requirements

- Node.js 18+
- A MongoDB database — **MongoDB Atlas** (cloud) recommended

## 1. Configure

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

- `MONGODB_URI` — your Atlas connection string (Atlas → Cluster → Connect →
  Drivers). Keep the `/vibely` database name in the path, e.g.
  `mongodb+srv://USER:PASS@cluster0.xxxx.mongodb.net/vibely?retryWrites=true&w=majority`
- `JWT_SECRET` — any long random string
- `PUBLIC_URL` — where this API is reachable (default `http://localhost:4000`)

> In Atlas, add your machine's IP under **Network Access** (or `0.0.0.0/0` for
> testing) or the connection will hang.

## 2. Install

```bash
npm install
```

## 3. Migrate your existing Supabase data (one-time)

```bash
npm run migrate
```

This signs in to the old Supabase project (as the test user), copies
`userMetadata`, `posts`, `stories`, `messages`, `followers`, `likes`,
`comments` into MongoDB, and preserves the numeric ids.

Supabase auth passwords can't be exported, so **every migrated user gets the
password `12345`** (configurable via `MIGRATION_DEFAULT_PASSWORD`). Log in with
any migrated email + `12345` (e.g. `khushi@gmail.com` / `12345`).

Re-running the migration wipes and reloads the collections.

## 4. Run

```bash
npm start        # or: npm run dev  (auto-restart)
```

API is at `http://localhost:4000/api`. Health check: `GET /health`.

## Frontend

Point the frontend at this API with a `.env` in the project root:

```
VITE_API_URL=http://localhost:4000/api
```

Then `npm run dev` in the project root as usual.

## Notes

- **Auth:** JWT stored in `localStorage` (`vibely_token`) and sent as
  `Authorization: Bearer <token>`. All `/api/*` routes require it except
  `POST /api/auth/login`.
- **Images:** new uploads are saved under `backend/uploads/` and served at
  `/uploads/...`. Images that came over in the migration still point at the old
  Supabase public storage URLs (they keep working). To become 100% Supabase-free
  you'd re-upload those files — optional.
- **IDs:** documents keep an integer `id` field (via a `counters` collection) so
  the app's numeric id comparisons keep working.

## Endpoints (summary)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/auth/login` | email+password → `{ token, user }` |
| GET | `/api/auth/me` | current user |
| GET | `/api/users`, `/by-id/:id`, `/by-email/:email`, `/by-username/:name` | user metadata |
| GET/POST/PATCH/DELETE | `/api/posts` | feed / profile / single / CRUD |
| GET/POST | `/api/stories` | list (by followers) / create |
| GET/POST/PATCH | `/api/messages` | conversations, chat, send, mark seen |
| GET/POST/PATCH/DELETE | `/api/followers` | connections + follow requests |
| GET/POST/DELETE | `/api/likes` | list / like / unlike |
| POST | `/api/comments` | add comment |
| POST | `/api/upload` | multipart image → `{ url }` |
