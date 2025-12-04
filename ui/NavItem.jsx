import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, label, icon: Icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `hover:text-text-primary flex flex-col items-center rounded-xl px-4 py-2 ${isActive ? " bg-background text-text-primary" : "text-text-secondary"}`
      }
    >
      <Icon className="text-2xl" />
      <span className="text-sm font-bold">{label}</span>
    </NavLink>
  );
};

export default NavItem;
