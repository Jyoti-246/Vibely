import React from "react";
import Profile from "./Profile";
import { useParams } from "react-router-dom";
import { useMetaDataByUsername } from "../features/Messagesfeatures/useMetaDataByUsername";

const UserProfile = () => {
  const { user_name } = useParams();
  const { metaData } = useMetaDataByUsername(user_name);

  return (
    <div>
      <Profile metaData={metaData} />
    </div>
  );
};

export default UserProfile;
