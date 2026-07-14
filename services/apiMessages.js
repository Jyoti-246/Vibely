import { api } from "./api";

export async function getMessages(userId) {
  return api(`/messages/unseen/${userId}`);
}

export async function getUserAllMessages(userId) {
  return api(`/messages/conversations/${userId}`);
}

export async function getChatMessages(userId, chatUserId) {
  return api(`/messages/chat?userId=${userId}&chatUserId=${chatUserId}`);
}

export async function createMessage({ fromUser, toUser, message }) {
  return api("/messages", {
    method: "POST",
    body: { fromUser, toUser, message },
  });
}

export async function updateSeenMessage(fromUser, toUser) {
  return api("/messages/seen", {
    method: "PATCH",
    body: { fromUser, toUser },
  });
}
