import supabase from "./supabase";

export async function getAllFollowers(userId) {
  const { data, error } = await supabase
    .from("followers")
    .select("*")
    .or(`followingId.eq.${userId},followerId.eq.${userId}`);

  if (error) throw new Error("Followers could not got");

  return data;
}

export async function getSpecificFollowInfo(user, request) {
  if (!user || !request) return null;

  const { data, error } = await supabase
    .from("followers")
    .select("*")
    .eq("followingId", user)
    .eq("followerId", request)
    .maybeSingle();

  if (error) throw new Error("Follow info could not fetched");

  return data;
}

export async function getCurrentProfileFollow(currentUserId, title, status) {
  let query = supabase.from("followers");

  if (title === "follower")
    query = query
      .select("followingId")
      .match({ followerId: currentUserId, status });

  if (title === "following")
    query = query
      .select("followerId")
      .match({ followingId: currentUserId, status });

  const { data, error } = await query;

  if (error) throw new Error(`${title} is not fetching`);

  return data;
}

export async function getFollowers(currentUserId) {
  const { data, error } = await supabase
    .from("followers")
    .select("followingId, followerId")
    .or(`and(followingId.eq.${currentUserId},status.eq.accepted)`);

  if (error) throw new Error("Followers does not read");

  let userIds = new Set();

  data.forEach((r) => {
    if (r.followerId !== currentUserId) userIds.add(r.followerId);
  });

  userIds.add(currentUserId);

  return userIds;
}

export async function getUpdateFollow({ followingId, followerId, status }) {
  const { data, error } = await supabase
    .from("followers")
    .update({ status })
    .match({ followerId, followingId })
    .single();

  if (error) throw new Error("follow request successfully updated");

  return data;
}

export async function getCreateFollow(newFollow) {
  const { data, error } = await supabase
    .from("followers")
    .upsert([newFollow])
    .select("*")
    .single();

  if (error) throw new Error("New follow could not created");

  return data;
}

export async function getDeleteRequestFollow({ followingId, followerId }) {
  const { data, error } = await supabase
    .from("followers")
    .delete()
    .match({ followerId, followingId })
    .maybeSingle();

  if (error) throw new Error(" Request could not deleted");

  return data;
}
