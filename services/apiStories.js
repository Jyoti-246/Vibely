import { api, uploadImage } from "./api";

export async function getStories(followers) {
  const list = Array.from(followers || []).join(",");
  return api(`/stories?followers=${encodeURIComponent(list)}`);
}

export async function createStory(newStory) {
  let storyImage = newStory.storyImage;

  // A freshly selected File -> upload and use the returned URL.
  if (storyImage && typeof storyImage !== "string") {
    storyImage = await uploadImage(storyImage);
  }

  return api("/stories", {
    method: "POST",
    body: { userId: newStory.userId, storyImage },
  });
}

export async function deleteStory(storyId) {
  return api(`/stories/${storyId}`, { method: "DELETE" });
}
