import React from "react";
import ProfileuserPost from "./ProfileuserPost";

const ProfileUserPosts = ({ posts }) => {
  return (
    <ul className="mt-8 grid grid-cols-6 gap-2">
      {posts?.map((post) => {
        return <ProfileuserPost post={post} key={post.id} />;
      })}
    </ul>
  );
};

export default ProfileUserPosts;
