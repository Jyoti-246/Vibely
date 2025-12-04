import React from "react";
import Button from "./Button";
import { useCreateFollow } from "../features/profile/useCreateFollow";
import { NavLink } from "react-router-dom";
// import { useGetSpecificFollowInfo } from "../features/profile/useGetSpecificFollowInfo";

const SuggestedFollower = ({ metaData, suggestion }) => {
  const { createFollow } = useCreateFollow();
  console.log(suggestion);

  // const { specificFollowInfo } = useGetSpecificFollowInfo(
  //   metaData?.[0]?.id,
  //   suggestion?.id,
  // );
  // console.log("spcific data", specificFollowInfo);

  function handleFollow() {
    createFollow({
      followingId: metaData?.[0]?.id,
      followerId: suggestion?.id,
      status: "requested",
    });
  }

  return (
    <li className="flex items-center justify-between">
      <NavLink
        to={`/profile/${suggestion?.user_name}`}
        className="flex items-center gap-3"
      >
        <img
          src={suggestion.user_avatar}
          alt=""
          className="z-10 h-9.5 w-9.5 rounded-md"
        />
        <div className="font-Montserrat flex flex-col">
          <span className="text-text-primary text-xs font-semibold">
            {suggestion.user_name}
          </span>
          <span className="text-text-secondary text-xs font-normal">
            {suggestion.email}
          </span>
        </div>
      </NavLink>
      <Button label="Follow" onClick={handleFollow} />
    </li>
  );
};

export default SuggestedFollower;
