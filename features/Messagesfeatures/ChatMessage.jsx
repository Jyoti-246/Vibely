import React from "react";
import { timeAgo } from "../../utils/timeAgo";

const ChatMessage = ({ chat, isMyMessage }) => {
  return (
    <li className={`flex w-full flex-col ${isMyMessage && " items-end"} `}>
      <div
        className={`flex w-fit items-center gap-2 rounded-2xl px-6 py-3 ${isMyMessage ? "bg-primary" : "bg-tertiary"} `}
      >
        <span className="text-text-primary">{chat.message}</span>
        {isMyMessage && (
          <span className="text-text-primary/60">
            <i
              class={`fa-solid fa-check-double ${chat?.seen_time && "text-text-primary"}`}
            ></i>
          </span>
        )}
      </div>
      <span className="text-text-tertiary mt-1 px-1 text-[10px]">
        {timeAgo(chat?.created_at)}
      </span>
    </li>
  );
};

export default ChatMessage;
