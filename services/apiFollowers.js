import { api } from "./api";

export async function getAllFollowers(userId) {
  return api(`/followers/all/${userId}`);
}

export async function getSpecificFollowInfo(user, request) {
  if (!user || !request) return null;
  return api(`/followers/specific?user=${user}&request=${request}`);
}

export async function getCurrentProfileFollow(currentUserId, title, status) {
  return api(
    `/followers/profile?userId=${currentUserId}&title=${title}&status=${status}`,
  );
}

// Returns an array of connected user ids (including self) for the feed queries.
export async function getFollowers(currentUserId) {
  return api(`/followers/accepted/${currentUserId}`);
}

export async function getUpdateFollow({ followingId, followerId, status }) {
  return api("/followers", {
    method: "PATCH",
    body: { followingId, followerId, status },
  });
}

export async function getCreateFollow(newFollow) {
  return api("/followers", { method: "POST", body: newFollow });
}

export async function getDeleteRequestFollow({ followingId, followerId }) {
  return api("/followers", {
    method: "DELETE",
    body: { followingId, followerId },
  });
}
