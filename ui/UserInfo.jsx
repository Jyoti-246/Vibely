import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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

  function handleMessage() {
    navigate("/messages", {
      state: {
        chatUser: {
          id: currentProfileUserId,
          user_name,
          user_avatar,
          email,
        },
      },
    });
  }
  return (
    <>
      <div className="font-Montserrat flex flex-col items-center gap-3">
        <img
          src={user_avatar}
          alt=""
          className="border-background ring-primary/60 relative z-10 -mt-16 h-30 w-30 rounded-full border-4 object-cover ring-2"
        />
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
          <span className="text-text-secondary text-sm">
            Software Engineer · Innovator · Tech Enthu
          </span>
          <ul className="mt-3 flex w-full gap-3">
            <CountInfo label="Posts" count={postLength} />
            <CountInfo label="Followers" count={followersLength} />
            <CountInfo label="Following" count={followingsLength} />
          </ul>
        </div>
        {!isCurrentLogedInUserProfile && (
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <button
              className={`cursor-pointer rounded-xl px-8 py-2 text-lg font-semibold text-white transition-all hover:-translate-y-0.5 ${
                hasAccept
                  ? "bg-tertiary border-border border"
                  : "bg-primary hover:bg-primary-hover shadow-glow"
              }`}
              onClick={handleFollow}
            >
              {hasRequest ? "Requested" : hasAccept ? "Unfollow" : "Follow"}
            </button>

            {hasAccept && (
              <button
                className="bg-primary hover:bg-primary-hover shadow-glow cursor-pointer rounded-xl px-8 py-2 text-lg font-semibold text-white transition-all hover:-translate-y-0.5"
                onClick={handleMessage}
              >
                Message
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UserInfo;
