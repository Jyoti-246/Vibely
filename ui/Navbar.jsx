import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  BiGroup,
  BiHome,
  BiMessageRounded,
  BiSearchAlt2,
  BiUser,
} from "react-icons/bi";
import Button from "./Button";
import Modal from "./Modal";
import PostForm from "../features/FeedPage/PostForm";
import { useUser } from "../features/authentication/useUser";
import { useMetaData } from "../features/Messagesfeatures/useMetaData";
import { FiPlusCircle } from "react-icons/fi";
import NavItem from "./NavItem";
import ModalDuplicate from "./ModalDuplicate";

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useUser();
  const { metaData } = useMetaData(user?.email);
  const user_name = metaData?.[0].user_name;

  return (
    <div className="font-Montserrat flex flex-col gap-8">
      <NavItem to="/" label="Feed" icon={BiHome} />
      <NavItem to="/messages" label="Messages" icon={BiMessageRounded} />
      <NavItem to="/connections" label="Connections" icon={BiGroup} />
      <NavItem to="/discover" label="Discover" icon={BiSearchAlt2} />
      <NavItem to={`/profile/${user_name}`} label="Profile" icon={BiUser} />

      <Button
        logo={<FiPlusCircle />}
        label="Create Post"
        onClick={() => setOpenModal(true)}
      />

      <ModalDuplicate
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Create Post"
      >
        <PostForm setOpenModal={setOpenModal} />
      </ModalDuplicate>
    </div>
  );
};

export default Navbar;
