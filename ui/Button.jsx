import React from "react";

const Button = ({ onClick, label, className = "" }) => {
  return (
    <button
      className={`bg-primary text-text-primary cursor-pointer rounded-md px-5 py-1 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
