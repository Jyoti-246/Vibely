import React from "react";
import ProfileuserPost from "./ProfileuserPost";

const ProfileUserPosts = ({ posts }) => {
  return (
    <ul className="mt-8 grid grid-cols-2 gap-2 px-2 sm:grid-cols-3 sm:px-10 md:px-0 lg:grid-cols-4">
      {posts?.map((post) => {
        return <ProfileuserPost post={post} key={post.id} />;
      })}
    </ul>
  );
};

export default ProfileUserPosts;
