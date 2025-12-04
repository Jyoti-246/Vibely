import React from "react";
import { useMetaDataById } from "../features/Messagesfeatures/useMetaDataById";

const Comment = ({ comment }) => {
  console.log(comment);

  const { metaData } = useMetaDataById(comment?.userId);
  console.log(metaData?.comment);

  return (
    <li className="mx-2 mt-2 flex">
      <img
        src={metaData?.user_avatar}
        alt=""
        className="z-10 m-1 h-10 w-10 rounded-full"
      />
      <div className="flex gap-1">
        <span className="font-semibold text-gray-800">
          {metaData?.user_name}
        </span>
        <span className="text-gray-700">{comment?.comment}</span>
      </div>
    </li>
  );
};

export default Comment;
