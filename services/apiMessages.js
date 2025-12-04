import supabase from "./supabase";

export async function getMessages(userId) {
  // if (!userId) return [];

  const { data, error } = await supabase
    .from("messages")
    .select("*, userMetadata: toUser(*)")
    .eq("toUser", userId);

  if (error) throw new Error(`Messages could not be loaded ${error}`);

  return data;
}

export async function getUserAllMessages(userId) {
  const { data, error } = await supabase.rpc("get_latest_conversations", {
    uid: userId,
  });
  if (error) throw new Error("Messages could not be loaded");

  return data;
}

export async function getChatMessages(userId, chatUserId) {
  const { data, error } = await supabase
    .from("messages")
    .select("*, sender: fromUser(*), receiver: toUser(*)")
    .or(
      `and(fromUser.eq.${userId},toUser.eq.${chatUserId}),and(fromUser.eq.${chatUserId},toUser.eq.${userId})`,
    )
    .order("created_at", { ascending: true });

  if (error) throw new Error("Messages could not be loaded");

  return data;
}

export async function createMessage({ fromUser, toUser, message }) {
  const { data, error } = await supabase
    .from("messages")
    .insert({ fromUser, toUser, message });

  if (error) throw new Error("Messages could not be created");

  return data;
}

export async function updateSeenMessage(fromUser, toUser) {
  console.log(fromUser, toUser);

  const { data, error } = await supabase
    .from("messages")
    .update({ seen_time: new Date() })
    .match({ fromUser, toUser })
    .is("seen_time", null)
    .select();

  if (error) throw new Error("Messages could not be Seen");

  return data;
}
