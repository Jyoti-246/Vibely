import React from "react";
import { HiXMark } from "react-icons/hi2";

const ModalDuplicate = ({ openModal, children, setOpenModal, title }) => {
  if (!openModal) return null;
  return (
    <div className="fixed inset-0 z-20 flex h-screen w-full items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-secondary text-text-primary font-Montserrat flex flex-col gap-6 rounded-2xl p-5">
        <div className="flex justify-between">
          <span className="text-lg font-semibold">{title}</span>
          <button
            className="top-4 right-4 cursor-pointer"
            onClick={() => setOpenModal(false)}
          >
            <HiXMark className="text-xl" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalDuplicate;
