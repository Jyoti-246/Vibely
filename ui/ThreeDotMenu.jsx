import React, { useState, useRef, useEffect } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";

const ThreeDotMenu = ({ items = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* 3 dots button */}

      <HiEllipsisVertical
        className="text-text-secondary text-xl"
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Dropdown menu */}
      {isOpen && (
        <div className="bg-tertiary absolute right-0 z-10 mt-2 w-40 rounded-md shadow-lg">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick(); // execute passed action
                setIsOpen(false); // close menu after click
              }}
              className="text-text-primary hover:bg-background block w-full px-4 py-2 text-left text-sm"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThreeDotMenu;
