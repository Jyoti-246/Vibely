import React from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Sidebar = () => {
  return (
    <div className="bg-secondary border-border hidden flex-col items-center justify-between border-r px-3 pt-14 pb-8 md:flex">
      <div className="flex flex-col items-center gap-14">
        <Logo />
        <Navbar />
      </div>
      <Footer />
    </div>
  );
};

export default Sidebar;
