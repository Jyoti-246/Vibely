import React from "react";
import ProfileuserPost from "./ProfileuserPost";

const ProfileUserPosts = ({ posts }) => {
  return (
    <ul className="grid-1 mt-8 grid gap-2 px-5 sm:grid-cols-3 sm:px-10 md:px-0 lg:grid-cols-4">
      {posts?.map((post) => {
        return <ProfileuserPost post={post} key={post.id} />;
      })}
    </ul>
  );
};

export default ProfileUserPosts;
