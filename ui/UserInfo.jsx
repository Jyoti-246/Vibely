import React from "react";
import { useCreateFollow } from "../features/profile/useCreateFollow";
import { useDeleteRequestFollow } from "../features/profile/useDeleteRequestFollow";
import CountInfo from "./CountInfo";

const UserInfo = ({
  user_avatar,
  user_name,
  email,
  postLength,
  followingsLength,
  followersLength,
  isCurrentLogedInUserProfile,
  currentUserId: currentProfileUserId,
  currentLogedInUserId,
  requestedData,
  acceptedData,
}) => {
  const { createFollow } = useCreateFollow();
  const { deleteRequest } = useDeleteRequestFollow();

  const hasRequest = requestedData?.some(
    (request) => request.followerId === currentProfileUserId,
  );

  const hasAccept = acceptedData?.some(
    (request) => request.followerId === currentProfileUserId,
  );

  function handleFollow() {
    if (!hasRequest && !hasAccept)
      createFollow({
        status: "requested",
        followerId: currentProfileUserId,
        followingId: currentLogedInUserId,
      });
    else if (hasAccept || hasRequest)
      deleteRequest({
        followerId: currentProfileUserId,
        followingId: currentLogedInUserId,
      });
  }
  return (
    <>
      <div className="font-Montserrat flex flex-col items-center gap-3">
        <img src={user_avatar} alt="" className="h-30 w-30 rounded-full" />
        <div className="flex flex-col gap-1 text-center">
          {user_name && (
            <span className="text-text-primary text-xl font-semibold">
              {user_name}
            </span>
          )}
          {email && (
            <span className="text-text-tertiary text-sm font-normal">
              {email}
            </span>
          )}
          <span className="text-text-secondary text-md">
            Software Engineer|Innovator|Tech Enthu
          </span>
          <ul className="mt-3 flex w-full gap-3">
            <CountInfo label="Posts" count={postLength} />
            <CountInfo label="Followers" count={followersLength} />
            <CountInfo label="Following" count={followingsLength} />
          </ul>
        </div>
        {!isCurrentLogedInUserProfile && (
          <button
            className="absolute right-18 cursor-pointer rounded-2xl bg-indigo-500 px-6 py-2 text-xl text-white"
            onClick={handleFollow}
          >
            {hasRequest ? "Requested" : hasAccept ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
      {/* {isCurrentLogedInUserProfile && (
        <div>
          <button className="text-md my-6 ml-21 rounded-xl bg-indigo-500 px-38 py-2 text-center">
            Edit Profile
          </button>
          <button className="text-md my-6 ml-2 rounded-xl bg-indigo-500 px-38 py-2 text-center">
            Edit Profile
          </button>
        </div>
      )} */}
    </>
  );
};

export default UserInfo;
