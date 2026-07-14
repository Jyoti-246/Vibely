import React from "react";
import { NavLink } from "react-router-dom";

const CurrentUserInfo = ({ user_avatar, user_name, email, className = "" }) => {
  return (
    <div className={`font-Montserrat flex min-w-0 items-center gap-2 ${className}`}>
      <img src={user_avatar} alt="" className="h-10 w-10 shrink-0 rounded-lg" />
      <div className="flex min-w-0 flex-col">
        {user_name && (
          <span className="text-text-primary truncate font-semibold">
            {user_name}
          </span>
        )}
        {email && (
          <span className="text-text-secondary truncate text-xs">{email}</span>
        )}
      </div>
    </div>
  );
};

export default CurrentUserInfo;
