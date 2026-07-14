import React, { useState } from "react";
import { BiGroup, BiHome, BiMessageRounded, BiUser } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import PostForm from "../features/FeedPage/PostForm";
import { useUser } from "../features/authentication/useUser";
import { useMetaData } from "../features/Messagesfeatures/useMetaData";
import ModalDuplicate from "./ModalDuplicate";

const linkClass = ({ isActive }) =>
  `flex flex-1 flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-semibold transition-colors ${
    isActive ? "text-primary" : "text-text-secondary"
  }`;

const MobileNav = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useUser();
  const { metaData } = useMetaData(user?.email);
  const user_name = metaData?.[0]?.user_name;

  return (
    <>
      <nav className="bg-secondary/95 border-border fixed right-0 bottom-0 left-0 z-30 flex h-16 items-center justify-around border-t px-1 backdrop-blur-md md:hidden">
        <NavLink to="/" end className={linkClass}>
          <BiHome className="text-xl" />
          <span>Feed</span>
        </NavLink>

        <NavLink to="/messages" className={linkClass}>
          <BiMessageRounded className="text-xl" />
          <span>Chats</span>
        </NavLink>

        <button
          onClick={() => setOpenModal(true)}
          className="text-text-secondary hover:text-text-primary flex flex-1 flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-semibold"
        >
          <FiPlusCircle className="text-2xl" />
          <span>Post</span>
        </button>

        <NavLink to="/connections" className={linkClass}>
          <BiGroup className="text-xl" />
          <span>Connect</span>
        </NavLink>

        <NavLink to={`/profile/${user_name}`} className={linkClass}>
          <BiUser className="text-xl" />
          <span>Profile</span>
        </NavLink>
      </nav>

      <ModalDuplicate
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Create Post"
      >
        <PostForm setOpenModal={setOpenModal} />
      </ModalDuplicate>
    </>
  );
};

export default MobileNav;
