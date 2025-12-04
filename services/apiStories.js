import supabase from "./supabase";

export async function getStories(followers) {
  const { data, error } = await supabase
    .from("stories")
    .select("*, userMetadata(user_avatar, user_name)")
    .in("userId", followers);

  if (error) throw new Error("Stories could not be uploaded");

  return data;
}
