import React from "react";
import { useLogout } from "../features/authentication/useLogout";
import { MdOutlineLogout } from "react-icons/md";

const LogoutButton = () => {
  const { logout } = useLogout();

  return (
    <button className="cursor-pointer text-2xl text-stone-500" onClick={logout}>
      <MdOutlineLogout />
    </button>
  );
};

export default LogoutButton;
