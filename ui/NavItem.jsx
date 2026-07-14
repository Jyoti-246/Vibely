import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, label, icon: Icon }) => {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 rounded-xl px-5 py-2.5 transition-colors duration-200 ${
          isActive
            ? "bg-primary/15 text-primary"
            : "text-text-secondary hover:bg-tertiary/60 hover:text-text-primary"
        }`
      }
    >
      <Icon className="text-2xl" />
      <span className="text-sm font-bold">{label}</span>
    </NavLink>
  );
};

export default NavItem;
