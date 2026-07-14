import { api } from "./api";

export async function getLikes() {
  return api("/likes");
}

export async function createLikes(newLike) {
  return api("/likes", { method: "POST", body: newLike });
}

export async function getLike(postId, userId) {
  const likes = await api("/likes");
  return likes.some((l) => l.postId === postId && l.userId === userId);
}

export async function deleteLike({ userId, postId }) {
  return api("/likes", { method: "DELETE", body: { userId, postId } });
}
