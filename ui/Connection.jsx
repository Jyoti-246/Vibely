import React from "react";
import { useMetaDataById } from "../features/Messagesfeatures/useMetaDataById";
import { useDeleteRequestFollow } from "../features/profile/useDeleteRequestFollow";
import { useUpdateFollow } from "../features/profile/useUpdateFollow";
import CurrentUserInfo from "./currentUserInfo";
import { NavLink } from "react-router-dom";
import { useCreateFollow } from "../features/profile/useCreateFollow";
import { useGetSpecificFollowInfo } from "../features/profile/useGetSpecificFollowInfo";
import Button from "./Button";

const Connection = ({ request, userId: user, currentStatus, followings }) => {
  const { metaData } = useMetaDataById(request);

  const { deleteRequest } = useDeleteRequestFollow();
  const { updateFollow } = useUpdateFollow();
  const { createFollow } = useCreateFollow();
  const { specificFollowInfo } = useGetSpecificFollowInfo(user, request);

  const hasFollowing = followings?.includes(request);

  function handleDelete(user, request) {
    deleteRequest({
      followerId: request,
      followingId: user,
    });
  }

  function handleCreate(request, user) {
    createFollow({
      status: "requested",
      followerId: request,
      followingId: user,
    });
  }

  function handleRequestAccept(user, request, status) {
    updateFollow({
      followerId: user,
      followingId: request,
      status: status,
    });
  }

  return (
    <li className="bg-secondary flex items-center justify-between rounded-2xl p-3">
      <CurrentUserInfo
        user_name={metaData?.user_name}
        user_avatar={metaData?.user_avatar}
        email={metaData?.email}
      />
      {currentStatus === "requests" && (
        <div className="flex gap-2">
          <Button
            label="Accept"
            onClick={() => handleRequestAccept(user, request, "accepted")}
            className="py-3"
          />
          <Button
            label="Cancel"
            onClick={() => handleDelete(request, user)}
            className="bg-tertiary py-3"
          />
        </div>
      )}
      {currentStatus === "following" && (
        <div className="flex gap-2">
          <NavLink to={`/profile/${metaData?.user_name}`}>
            <Button label="Profile" onClick={{}} className="py-3" />
          </NavLink>
          <Button
            label="Unfollow"
            onClick={() => handleDelete(user, request)}
            className="bg-tertiary py-3"
          />
        </div>
      )}
      {currentStatus === "followers" && (
        <div className="flex gap-2">
          {hasFollowing ? (
            <NavLink to={`/profile/${metaData?.user_name}`}>
              <Button label="Profile" onClick={{}} className="py-3" />
            </NavLink>
          ) : (
            <>
              <Button
                label={
                  specificFollowInfo?.status === "requested"
                    ? "Requested"
                    : "Follow Back"
                }
                onClick={() => handleCreate(request, user, "rquested")}
                className="py-3"
              />
              {/* <button className="mx-2 cursor-pointer rounded-2xl bg-red-400 px-6 py-2 text-xl"></button> */}
            </>
          )}

          <Button
            label="Remove"
            onClick={() => handleDelete(request, user)}
            className="bg-tertiary py-3"
          />
        </div>
      )}
    </li>
  );
};

export default Connection;
