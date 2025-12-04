import React from "react";
import Post from "../../ui/Post";
import { usePosts } from "./usePosts";
import { useFollowers } from "./useFollowers";
import { useUser } from "../authentication/useUser";
import { useMetaData } from "../Messagesfeatures/useMetaData";
// import { useLikes } from "../profile/useLikes";

const Posts = () => {
  const { isLoading, user } = useUser();
  const { isLoading: isLoadingMetaData, metaData } = useMetaData(user?.email);

  const { followers } = useFollowers(metaData?.[0]?.id);
  const { posts } = usePosts(followers);

  if (isLoading || isLoadingMetaData) return null;

  return (
    <ul className="flex flex-col gap-5">
      {posts?.map((post) => {
        return <Post data={post} key={post.id} metaData={metaData} />;
      })}
    </ul>
  );
};

export default Posts;
