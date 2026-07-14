import React from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen max-w-full">
      <Sidebar />
      <main className="min-w-0 flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
};

export default AppLayout;
