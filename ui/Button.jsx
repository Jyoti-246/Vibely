import React from "react";

const Button = ({ onClick, label, className = "" }) => {
  return (
    <button
      className={`bg-primary text-text-primary hover:bg-primary-hover shadow-soft hover:shadow-glow cursor-pointer rounded-lg px-5 py-1.5 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
