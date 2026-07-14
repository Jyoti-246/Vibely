import { api, uploadImage } from "./api";

export async function getCurrentActivePost(currentPostId) {
  return api(`/posts/${currentPostId}`);
}

export async function getCurrentProfilePosts(currentUserId) {
  return api(`/posts/profile/${currentUserId}`);
}

export async function getPosts(followers) {
  const list = Array.from(followers || []).join(",");
  return api(`/posts?followers=${encodeURIComponent(list)}`);
}

export async function createUpdatePost(newPost, id) {
  let image = newPost.image;

  // New selection from a file input (FileList/File) -> upload first.
  if (image && typeof image !== "string") {
    const file = image[0] || image;
    image = await uploadImage(file);
  }

  const { comments, likes, userMetadata, id: _ignore, ...rest } = newPost;
  const payload = { ...rest, image };

  if (id) return api(`/posts/${id}`, { method: "PATCH", body: payload });
  return api("/posts", { method: "POST", body: payload });
}

export async function deletePost(postId) {
  return api(`/posts/${postId}`, { method: "DELETE" });
}
