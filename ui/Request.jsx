import React from "react";
import { useMetaDataById } from "../features/Messagesfeatures/useMetaDataById";
import CurrentUserInfo from "./CurrentUserInfo";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import { useDeleteRequestFollow } from "../features/profile/useDeleteRequestFollow";
import { useUpdateFollow } from "../features/profile/useUpdateFollow";

const Request = ({ request, userId }) => {
  const { metaData } = useMetaDataById(request);
  const { deleteRequest } = useDeleteRequestFollow();
  const { updateFollow } = useUpdateFollow();

  function handleAccept() {
    updateFollow({
      followingId: request,
      followerId: userId,
      status: "accepted",
    });
  }

  function handleDeny() {
    deleteRequest({
      followingId: request,
      followerId: userId,
    });
  }

  return (
    <li className="flex items-center justify-between gap-2">
      <NavLink to={`/profile/${metaData?.user_name}`} className="min-w-0">
        <CurrentUserInfo
          user_name={metaData?.user_name}
          user_avatar={metaData?.user_avatar}
          email={metaData?.email}
        />
      </NavLink>

      <div className="flex shrink-0 gap-2">
        <Button label="Accept" onClick={handleAccept} className="py-3" />
        <Button
          label="Deny"
          onClick={handleDeny}
          className="bg-tertiary py-3"
        />
      </div>
    </li>
  );
};

export default Request;
