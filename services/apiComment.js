import { api } from "./api";

export async function getCreateComment({ postId, userId, commentMessage }) {
  return api("/comments", {
    method: "POST",
    body: { postId, userId, commentMessage },
  });
}
