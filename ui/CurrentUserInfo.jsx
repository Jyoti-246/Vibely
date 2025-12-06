import React from "react";
import { NavLink } from "react-router-dom";

const CurrentUserInfo = ({ user_avatar, user_name, email, className = "" }) => {
  return (
    <div className={`font-Montserrat flex items-center gap-2 ${className}`}>
      <img src={user_avatar} alt="" className="h-10 rounded-lg" />
      <div className="flex flex-col">
        {user_name && (
          <span className="text-text-primary font-semibold">{user_name}</span>
        )}
        {email && <span className="text-text-secondary text-xs">{email}</span>}
      </div>
    </div>
  );
};

export default CurrentUserInfo;
