import React from "react";

const CountInfo = ({ label, count, className }) => {
  return (
    <div
      className={`bg-secondary border-border hover:border-primary/50 flex w-full flex-col items-center gap-1 rounded-xl border py-4 transition-colors ${className} `}
    >
      <span className="text-text-primary text-2xl font-bold">{count ?? 0}</span>
      <span className="text-text-secondary text-sm font-medium">{label}</span>
    </div>
  );
};

export default CountInfo;
