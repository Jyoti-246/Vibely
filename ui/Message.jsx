import React from "react";
import { useUpdateSeenMessage } from "../features/Messagesfeatures/useUpdateSeenMessage";
import { timeAgo } from "../utils/timeAgo";

const Message = ({ metaData, message, setCurrentChat }) => {
  const { updateSeen } = useUpdateSeenMessage();
  const fromUser = message?.sender?.id;
  const toUser = metaData?.[0]?.id;

  const user =
    message?.sender?.id === metaData?.[0]?.id
      ? message?.receiver
      : message?.sender;

  function handleUpdateSeen() {
    updateSeen({ fromUser, toUser });
    setCurrentChat(message);
  }

  return (
    <li
      className="flex cursor-pointer items-center justify-between gap-2"
      onClick={() => {
        handleUpdateSeen();
      }}
    >
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={user?.user_avatar}
          alt=""
          className="z-10 h-9.5 w-9.5 shrink-0 rounded-md"
        />
        <div className="font-Montserrat flex min-w-0 flex-col">
          <span className="text-text-primary truncate text-xs font-semibold">
            {user?.user_name}
          </span>
          <span className="text-text-secondary truncate text-xs font-medium">
            {message?.message}
          </span>
        </div>
      </div>
      <span className="font-Montserrat text-text-secondary shrink-0 text-xs font-medium">
        {timeAgo(message?.created_at)}
      </span>
    </li>
  );
};

export default Message;
