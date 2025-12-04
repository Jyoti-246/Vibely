import supabase from "./supabase";

export async function getLikes() {
  const { data, error } = await supabase.from("likes").select("*");

  if (error) throw new Error("Likes could not got");

  return data;
}

export async function createLikes(newLike) {
  const { data, error } = await supabase
    .from("likes")
    .upsert([newLike])
    .single();

  if (error) throw new Error("Like could not be created");

  return data;
}

export async function getLike(postId, userId) {
  const { error } = await supabase
    .from("likes")
    .select("*")
    .match({ userId, postId })
    .maybeSingle();

  if (error) return false;

  return true;
}

export async function deleteLike({ userId, postId }) {
  const { data, error } = await supabase
    .from("likes")
    .delete()
    .match({ userId, postId })
    .maybeSingle();

  if (error) throw new Error("Like could not be deleted");

  return data;
}
