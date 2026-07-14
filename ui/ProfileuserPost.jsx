import React from "react";
import { NavLink } from "react-router-dom";

const ProfileuserPost = ({ post }) => {
  const { id: postId } = post;

  return (
    <li>
      <NavLink to={`/post-id/${postId}`}>
        <img
          src={post.image}
          alt=""
          className="h-40 w-full rounded-xl object-cover md:h-60"
        />
      </NavLink>
    </li>
  );
};

export default ProfileuserPost;
