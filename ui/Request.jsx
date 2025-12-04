import React from "react";
import { useMetaDataById } from "../features/Messagesfeatures/useMetaDataById";
import CurrentUserInfo from "./currentUserInfo";
import { useCreateFollow } from "../features/profile/useCreateFollow";
import Button from "./Button";
import { NavLink } from "react-router-dom";

const Request = ({ request }) => {
  const { metaData } = useMetaDataById(request);
  const { createFollow } = useCreateFollow();

  function handleFollow() {
    createFollow({
      followingId: metaData?.[0]?.id,
      followerId: request?.id,
      status: "requested",
    });
  }

  return (
    <li className="flex items-center justify-between">
      <NavLink to={`/profile/${metaData?.user_name}`}>
        <CurrentUserInfo
          user_name={metaData?.user_name}
          user_avatar={metaData?.user_avatar}
          email={metaData?.email}
        />
      </NavLink>

      <Button label="Follow" onClick={handleFollow} className="py-3" />
    </li>
  );
};

export default Request;
