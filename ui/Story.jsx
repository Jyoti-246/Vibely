import React from "react";

const Story = ({ data, onClick }) => {
  return (
    <li
      onClick={onClick}
      className="font-Montserrat flex w-16 shrink-0 cursor-pointer flex-col items-center gap-1.5"
    >
      <div className="from-primary to-accent rounded-full bg-gradient-to-tr p-[2.5px]">
        <div className="bg-background rounded-full p-[2px]">
          <img
            src={data.userMetadata.user_avatar}
            alt=""
            className="h-14 w-14 rounded-full object-cover transition-transform duration-200 hover:scale-105"
          />
        </div>
      </div>
      <span className="text-text-secondary w-full truncate text-center text-[11px] font-medium">
        {data.userMetadata.user_name}
      </span>
    </li>
  );
};

export default Story;
