import supabase, { supabaseUrl } from "./supabase";

export async function getCurrentActivePost(currentPostId) {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "*, userMetadata(user_name, user_avatar), likes(postId, userId), comments(postId, userId, comment)",
    )
    .eq("id", currentPostId)
    .single();

  if (error) throw new Error("Post could not be loaded");

  return data;
}

export async function getCurrentProfilePosts(currentUserId) {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "*, userMetadata(user_name, user_avatar), likes(postId), comments(postId)",
    )
    .eq("userId", currentUserId)
    .order("created_at", { ascending: false });

  if (error) throw new Error("Posts could not be loaded");

  return data;
}

export async function getPosts(followers) {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "*, userMetadata(user_name, user_avatar), likes(postId, userId), comments(postId)",
    )
    .in("userId", followers)
    .order("created_at", { ascending: false });

  if (error) throw new Error("Posts could not be loaded");

  return data;
}

// ("https://dteebbhsscavjajnewze.supabase.co/storage/v1/object/public/image/0.421127472402417-undefined");

export async function createUpdatePost(newPost, id) {
  console.log(newPost.image.name);

  const hasImagePath = newPost.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newPost.image.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = hasImagePath
    ? newPost.image
    : `${supabaseUrl}/storage/v1/object/public/image/${imageName}`;

  let query = supabase.from("posts");

  const { comments, likes, userMetadata, ...postData } = newPost;

  // 1. create
  if (!id) query = query.insert([{ ...postData, image: imagePath }]);

  // 2. edit
  if (id) query = query.update({ ...postData, image: imagePath }).eq("id", id);

  console.log(postData);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Post could not be created");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("image")
    .upload(imageName, newPost.image);

  if (storageError) {
    await supabase.from("posts").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Post image could not be uploaded and the post was not created",
    );
  }

  return data;
}

export async function deletePost(postId) {
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);

  if (error) throw new Error("Post could not be deleted");

  return data;
}
