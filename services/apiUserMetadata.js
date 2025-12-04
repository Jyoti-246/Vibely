import supabase from "./supabase";

export async function getMetaData() {
  const { data, error } = await supabase.from("userMetadata").select("*");

  if (error) throw new Error("User meta data could not be loaded");

  return data;
}

export async function getUserMetadataById(userId) {
  const { data, error } = await supabase
    .from("userMetadata")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error("User meta data could not be loaded");

  return data;
}

export async function getUserMetadata(email) {
  const { data, error } = await supabase
    .from("userMetadata")
    .select("*")
    .eq("email", email);

  if (error) throw new Error("User meta data could not be loaded");

  return data;
}

export async function getUserMetadataByUsername(user_name) {
  const { data, error } = await supabase
    .from("userMetadata")
    .select("*")
    .eq("user_name", user_name);

  if (error) throw new Error("User meta data could not be loaded");

  return data;
}
