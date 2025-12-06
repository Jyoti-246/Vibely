import React from "react";

const Story = ({ data }) => {
  // function timeAgo(timeInString) {
  //   const now = new Date();
  //   const date = new Date(timeInString);

  //   const diff = (now - date) / 1000;

  //   if (diff < 60) return `${Math.floor(diff)} seconds ago`;
  //   if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  //   if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;

  //   return `${Math.floor(diff / 86400)} days ago`;
  // }

  return (
    <>
      <li className="font-Montserrat relative shrink-0 rounded-xl font-medium">
        <img src={data.storyImage} alt="" className="h-48 w-38 rounded-md" />
        <div className="absolute right-2 bottom-2 left-2 z-10 flex items-center gap-2">
          <img
            src={data.userMetadata.user_avatar}
            alt=""
            className="border-text-primary h-7 w-7 rounded-full border-[0.6px]"
          />
          <span className="max-w-30 truncate text-[12px] font-medium text-white">
            {data.userMetadata.user_name}
          </span>
        </div>
      </li>
    </>
  );
};

export default Story;
