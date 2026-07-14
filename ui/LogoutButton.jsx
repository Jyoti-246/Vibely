import React from "react";
import { useLogout } from "../features/authentication/useLogout";
import { MdOutlineLogout } from "react-icons/md";

const LogoutButton = () => {
  const { logout } = useLogout();

  return (
    <button
      className="text-text-tertiary hover:text-text-primary cursor-pointer text-2xl transition-colors"
      onClick={logout}
      aria-label="Log out"
    >
      <MdOutlineLogout />
    </button>
  );
};

export default LogoutButton;
