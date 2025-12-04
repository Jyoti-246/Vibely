import supabase from "./supabase";

export async function getCreateComment({ postId, userId, commentMessage }) {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ postId, userId, comment: commentMessage }])
    .single();

  if (error) throw new Error("Comment could not be created");

  return data;
}
