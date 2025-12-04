import React, { useState } from "react";
import CurrentUserInfo from "../../ui/CurrentUserInfo";
import { useChatMessages } from "./useChatMessages";
import ChatMessage from "./ChatMessage";
import { useCreateMessage } from "./useCreateMessage";

const UserChatBox = ({ metaData, currentChat }) => {
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const user =
    currentChat?.sender?.id === metaData?.[0]?.id
      ? currentChat?.receiver
      : currentChat?.sender;

  const { chatMessages } = useChatMessages(metaData?.[0]?.id, user?.id);

  console.log(chatMessages);

  const { createMessage } = useCreateMessage();

  const bottomRef = React.useRef(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  function handleCreateMessage() {
    if (message === "") return null;
    createMessage(
      {
        fromUser: metaData?.[0]?.id,
        toUser: user?.id,
        message,
      },
      {
        onSettled: () => setMessage(""),
      },
    );
  }
  const addEmoji = (emoji) => {
    setMessage((prev) => prev + emoji.native);
  };
  return (
    <div className="bg-secondary flex flex-2 flex-col justify-between rounded-2xl p-6">
      <div className="flex flex-col gap-4.5">
        <div>
          <CurrentUserInfo
            user_avatar={user?.user_avatar}
            user_name={user?.user_name}
            email={user?.email}
          />
        </div>
        <div className="bg-text-secondary `py-[1px]`"> </div>
      </div>

      <div className="flex flex-col gap-2 overflow-auto">
        <div className="no-scrollbar flex flex-col overflow-y-auto p-4">
          <ul className="flex flex-col gap-2">
            {chatMessages?.map((chat) => {
              const isMyMessage = chat?.sender?.id === metaData?.[0]?.id;

              return (
                <ChatMessage
                  chat={chat}
                  isMyMessage={isMyMessage}
                  key={chat?.id}
                />
              );
            })}
          </ul>
          <div ref={bottomRef} />
        </div>

        <div className="relative flex gap-2">
          {showPicker && (
            <div className="absolute right-0 bottom-14 z-50 rounded-lg shadow-lg">
              {/* <Picker data={data} onEmojiSelect={addEmoji} /> */}
            </div>
          )}
          <div className="bg-tertiary flex w-full items-center gap-4 rounded-2xl px-6 py-2">
            <i class="fa-solid fa-magnifying-glass text-text-secondary text-md"></i>
            <input
              type="text"
              className="text-text-primary w-full text-lg outline-none focus:ring-0"
              placeholder="Type your message here.."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateMessage();
                }
              }}
            />
            <button onClick={() => setShowPicker((prev) => !prev)}>😊</button>
          </div>
          <button
            className="bg-primary rounded-xl px-4 py-2"
            onClick={handleCreateMessage}
          >
            <i class="fa-regular fa-paper-plane text-text-primary cursor-pointer text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChatBox;
