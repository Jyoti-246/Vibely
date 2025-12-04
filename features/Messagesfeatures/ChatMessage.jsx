import React from "react";

const ChatMessage = ({ chat, isMyMessage }) => {
  return (
    <li className={`flex w-full flex-col ${isMyMessage && " items-end"} `}>
      <div
        className={`flex w-fit items-center gap-2 rounded-2xl px-6 py-3 ${isMyMessage ? "bg-primary" : "bg-tertiary"} `}
      >
        <span className="text-text-primary">{chat.message}</span>
        {isMyMessage && (
          <span className="text-tertiary">
            <i
              class={`fa-solid fa-check-double ${chat?.seen_time && "text-text-primary"}`}
            ></i>
          </span>
        )}
      </div>
    </li>
  );
};

export default ChatMessage;
