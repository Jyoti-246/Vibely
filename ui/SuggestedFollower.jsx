import React from "react";
import Button from "./Button";
import { useCreateFollow } from "../features/profile/useCreateFollow";
import { useDeleteRequestFollow } from "../features/profile/useDeleteRequestFollow";
import { useGetSpecificFollowInfo } from "../features/profile/useGetSpecificFollowInfo";
import { NavLink } from "react-router-dom";

const SuggestedFollower = ({ metaData, suggestion }) => {
  const me = metaData?.[0]?.id;
  const them = suggestion?.id;

  const { createFollow } = useCreateFollow();
  const { deleteRequest } = useDeleteRequestFollow();
  const { specificFollowInfo } = useGetSpecificFollowInfo(me, them);

  const status = specificFollowInfo?.status; // "requested" | "accepted" | undefined

  function handleClick() {
    if (!status) {
      createFollow({ followingId: me, followerId: them, status: "requested" });
    } else {
      deleteRequest({ followingId: me, followerId: them });
    }
  }

  const label =
    status === "requested"
      ? "Requested"
      : status === "accepted"
        ? "Following"
        : "Follow";

  return (
    <li className="flex items-center justify-between gap-2">
      <NavLink
        to={`/profile/${suggestion?.user_name}`}
        className="flex min-w-0 items-center gap-3"
      >
        <img
          src={suggestion.user_avatar}
          alt=""
          className="z-10 h-9.5 w-9.5 shrink-0 rounded-md object-cover"
        />
        <div className="font-Montserrat flex min-w-0 flex-col">
          <span className="text-text-primary truncate text-xs font-semibold">
            {suggestion.user_name}
          </span>
          <span className="text-text-secondary truncate text-xs font-normal">
            {suggestion.email}
          </span>
        </div>
      </NavLink>
      <Button
        label={label}
        onClick={handleClick}
        className={`shrink-0 ${status ? "bg-tertiary" : ""}`}
      />
    </li>
  );
};

export default SuggestedFollower;
