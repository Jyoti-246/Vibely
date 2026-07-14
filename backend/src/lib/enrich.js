import { User, Like, Comment } from "../models/index.js";

// Strip Mongo internals from a plain lean() object.
function clean(obj) {
  if (!obj) return obj;
  const { _id, __v, password, ...rest } = obj;
  return rest;
}

async function usersById(ids) {
  const unique = [...new Set(ids.filter((v) => v != null))];
  const users = await User.find({ id: { $in: unique } }).lean();
  const map = new Map();
  users.forEach((u) => map.set(u.id, clean(u)));
  return map;
}

// Rebuilds Supabase's `posts(*, userMetadata(...), likes(...), comments(...))`.
export async function enrichPosts(posts) {
  if (!posts.length) return [];
  const postIds = posts.map((p) => p.id);
  const userMap = await usersById(posts.map((p) => p.userId));

  const [likes, comments] = await Promise.all([
    Like.find({ postId: { $in: postIds } }).lean(),
    Comment.find({ postId: { $in: postIds } }).lean(),
  ]);

  const likesByPost = new Map();
  likes.forEach((l) => {
    if (!likesByPost.has(l.postId)) likesByPost.set(l.postId, []);
    likesByPost.get(l.postId).push(clean(l));
  });
  const commentsByPost = new Map();
  comments.forEach((c) => {
    if (!commentsByPost.has(c.postId)) commentsByPost.set(c.postId, []);
    commentsByPost.get(c.postId).push(clean(c));
  });

  return posts.map((p) => ({
    ...clean(p),
    userMetadata: userMap.get(p.userId) || null,
    likes: likesByPost.get(p.id) || [],
    comments: commentsByPost.get(p.id) || [],
  }));
}

// Rebuilds Supabase's `stories(*, userMetadata(...))`.
export async function enrichStories(stories) {
  if (!stories.length) return [];
  const userMap = await usersById(stories.map((s) => s.userId));
  return stories.map((s) => ({
    ...clean(s),
    userMetadata: userMap.get(s.userId) || null,
  }));
}

// Rebuilds `messages(*, sender: fromUser(*), receiver: toUser(*))`.
export async function enrichMessages(messages) {
  if (!messages.length) return [];
  const userMap = await usersById(
    messages.flatMap((m) => [m.fromUser, m.toUser]),
  );
  return messages.map((m) => ({
    ...clean(m),
    sender: userMap.get(m.fromUser) || null,
    receiver: userMap.get(m.toUser) || null,
  }));
}

export { clean };
