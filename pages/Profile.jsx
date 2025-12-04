import React from "react";
import UserInfo from "../ui/UserInfo";
import ProfileUserPosts from "../ui/ProfileUserPosts";
import { useUser } from "../features/authentication/useUser";
import { useMetaData } from "../features/Messagesfeatures/useMetaData";
import { useCurrentUserPosts } from "../features/FeedPage/useCurrentUserPosts";
import { useGetCurrentProfileFollow } from "../features/profile/useGetCurrentProfileFollow";

const Profile = ({ metaData }) => {
  const { isLoading, user } = useUser();

  const { isLoading: isLoadingMetaData, metaData: loginUser } = useMetaData(
    user?.email,
  );

  const {
    id: currentUserId,
    user_name,
    user_avatar,
    email,
  } = metaData?.[0] || {};

  const isCurrentLogedInUserProfile = loginUser?.[0]?.id === currentUserId;
  const currentLogedInUserId = loginUser?.[0]?.id;

  const { posts } = useCurrentUserPosts(currentUserId);

  const postLength = posts?.length;

  const { follow: requestedData } = useGetCurrentProfileFollow(
    currentLogedInUserId,
    "following",
    "requested",
  );

  const { follow: acceptedData } = useGetCurrentProfileFollow(
    currentLogedInUserId,
    "following",
    "accepted",
  );

  const { follow: followings } = useGetCurrentProfileFollow(
    currentUserId,
    "following",
    "accepted",
  );

  const followingsLength = followings?.length;

  const { follow: followers } = useGetCurrentProfileFollow(
    currentUserId,
    "follower",
    "accepted",
  );

  const followersLength = followers?.length;

  if (isLoading || isLoadingMetaData) return null;
  return (
    <div className="no-scrollbar h-screen overflow-scroll px-20 py-10">
      <div className="h-62 w-full overflow-hidden rounded-2xl">
        <img
          src="../coverImage.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <UserInfo
        user_name={user_name}
        user_avatar={user_avatar}
        email={email}
        postLength={postLength}
        followersLength={followersLength}
        followingsLength={followingsLength}
        isCurrentLogedInUserProfile={isCurrentLogedInUserProfile}
        currentUserId={currentUserId}
        currentLogedInUserId={currentLogedInUserId}
        requestedData={requestedData}
        acceptedData={acceptedData}
      />
      <ProfileUserPosts posts={posts} />
    </div>
  );
};

export default Profile;
