import React from "react";
import { useMetaDataById } from "../features/Messagesfeatures/useMetaDataById";

const Comment = ({ comment }) => {
  const { metaData } = useMetaDataById(comment?.userId);

  return (
    <div className={`font-Montserrat flex items-center gap-2`}>
      <img src={metaData?.user_avatar} alt="" className="h-8 rounded-md" />
      <div className="flex flex-col">
        <span className="text-text-primary text-sm font-normal">
          {metaData?.user_name}
        </span>

        <span className="text-text-secondary text-xs">{comment?.comment}</span>
      </div>
    </div>
  );
};

export default Comment;
