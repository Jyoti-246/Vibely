import React from "react";
import Profile from "./Profile";
import { useParams } from "react-router-dom";
import { useMetaDataByUsername } from "../features/Messagesfeatures/useMetaDataByUsername";

const UserProfile = () => {
  const { user_name } = useParams();
  console.log(user_name);
  const { metaData } = useMetaDataByUsername(user_name);
  console.log(metaData);

  return (
    <div>
      <Profile metaData={metaData} />
    </div>
  );
};

export default UserProfile;
