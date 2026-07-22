import React from "react";
import Post from "../../ui/Post";
import { usePosts } from "./usePosts";
import { useFollowers } from "./useFollowers";
import { useUser } from "../authentication/useUser";
import { useMetaData } from "../Messagesfeatures/useMetaData";
// import { useLikes } from "../profile/useLikes";
import EmptyFeed from "../../ui/EmptyFeed";

const Posts = () => {
  const { isLoading, user } = useUser();
  const { isLoading: isLoadingMetaData, metaData } = useMetaData(user?.email);

  const { followers } = useFollowers(metaData?.[0]?.id);
  const { posts } = usePosts(followers);

  if (isLoading || isLoadingMetaData) return null;

  if (!posts || posts.length === 0) {
    return <EmptyFeed />;
  }

  return (
    <ul className="mt-5 flex flex-col gap-3">
      {posts?.map((post) => {
        return <Post data={post} key={post.id} metaData={metaData} />;
      })}
    </ul>
  );
};

export default Posts;
