import React from "react";
import { useUpdateSeenMessage } from "../features/Messagesfeatures/useUpdateSeenMessage";

const Message = ({ metaData, message, setCurrentChat }) => {
  const { updateSeen } = useUpdateSeenMessage();
  const fromUser = message?.sender?.id;
  const toUser = metaData?.[0]?.id;

  const user =
    message?.sender?.id === metaData?.[0]?.id
      ? message?.receiver
      : message?.sender;

  function handleUpdateSeen() {
    console.log("dfghjkl");

    updateSeen({ fromUser, toUser });
    setCurrentChat(message);
  }

  return (
    <li
      className="flex items-center justify-between"
      onClick={() => {
        handleUpdateSeen();
      }}
    >
      <div className="flex items-center gap-3">
        <img
          src={user?.user_avatar}
          alt=""
          className="z-10 h-9.5 w-9.5 rounded-md"
        />
        <div className="font-Montserrat flex flex-col">
          <span className="text-text-primary text-xs font-semibold">
            {user?.user_name}
          </span>
          <span className="text-text-secondary text-xs font-medium">
            {message?.message}
          </span>
        </div>
      </div>
      <span className="font-Montserrat text-text-secondary text-xs font-medium">
        2h ago
      </span>
    </li>
  );
};

export default Message;
