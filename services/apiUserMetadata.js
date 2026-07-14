import { api } from "./api";

export async function getMetaData() {
  return api("/users");
}

export async function getUserMetadataById(userId) {
  return api(`/users/by-id/${userId}`);
}

export async function getUserMetadata(email) {
  return api(`/users/by-email/${encodeURIComponent(email)}`);
}

export async function getUserMetadataByUsername(user_name) {
  return api(`/users/by-username/${encodeURIComponent(user_name)}`);
}
