import React from "react";
import { useUser } from "../features/authentication/useUser";
import { useMetaData } from "../features/Messagesfeatures/useMetaData";

const Topbar = () => {
  const { user } = useUser();
  const { metaData } = useMetaData(user?.email);
  return (
    <div className="mt-10 flex items-center justify-end gap-7">
      <div className="bg-secondary rounded-xl p-4.5 text-center">
        <i class="fa-solid fa-bell text-text-secondary cursor-pointer text-2xl"></i>
      </div>

      <div className="bg-secondary rounded-xl p-4.5 text-center">
        <i class="fa-solid fa-comment-dots text-text-secondary cursor-pointer text-2xl"></i>
      </div>

      <img
        src={metaData?.[0]?.user_avatar}
        alt=""
        className="z-10 h-15 w-15 rounded-xl"
      />
    </div>
  );
};

export default Topbar;
