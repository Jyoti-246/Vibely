import React from "react";

const CountInfo = ({ label, count, className }) => {
  return (
    <div
      className={`border-tertiary flex w-full flex-col gap-1 rounded-md border py-4 ${className} `}
    >
      <span className="text-text-primary text-xl font-bold">{count}</span>
      <span className="text-text-secondary text-sm font-medium">{label}</span>
    </div>
  );
};

export default CountInfo;
