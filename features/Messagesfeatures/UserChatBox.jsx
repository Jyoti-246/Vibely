import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import CurrentUserInfo from "../../ui/CurrentUserInfo";
import { useChatMessages } from "./useChatMessages";
import ChatMessage from "./ChatMessage";
import { useCreateMessage } from "./useCreateMessage";

const UserChatBox = ({ metaData, currentChat, onBack }) => {
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const user =
    currentChat?.sender?.id === metaData?.[0]?.id
      ? currentChat?.receiver
      : currentChat?.sender;

  const { chatMessages } = useChatMessages(metaData?.[0]?.id, user?.id);

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

  // Nothing selected (e.g. no conversations on desktop).
  if (!currentChat || !user?.id) {
    return (
      <div className="bg-secondary border-border shadow-card text-text-tertiary flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-3 rounded-2xl border p-6">
        <i class="fa-regular fa-comment-dots text-4xl"></i>
        <p className="text-sm font-medium">
          Select a conversation to start chatting
        </p>
      </div>
    );
  }

  return (
    <div className="bg-secondary border-border shadow-card flex w-full min-w-0 flex-1 flex-col justify-between rounded-2xl border p-4 md:flex-2 md:p-6">
      <div className="flex flex-col gap-4.5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-text-primary text-2xl md:hidden"
            aria-label="Back to conversations"
          >
            <BiArrowBack />
          </button>
          <CurrentUserInfo
            user_avatar={user?.user_avatar}
            user_name={user?.user_name}
            email={user?.email}
          />
        </div>
        <div className="bg-border h-px w-full"> </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
        <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto p-4">
          {chatMessages && chatMessages.length === 0 ? (
            <div className="text-text-tertiary flex flex-1 flex-col items-center justify-center gap-2 text-center">
              <i class="fa-regular fa-paper-plane text-2xl"></i>
              <p className="text-sm font-medium">No messages yet. Say hi! 👋</p>
            </div>
          ) : (
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
          )}
          <div ref={bottomRef} />
        </div>

        <div className="relative flex gap-2">
          {showPicker && (
            <div className="absolute right-0 bottom-14 z-50 rounded-lg shadow-lg">
              {/* <Picker data={data} onEmojiSelect={addEmoji} /> */}
            </div>
          )}
          <div className="bg-tertiary border-border focus-within:border-primary/60 focus-within:ring-primary/15 flex w-full items-center gap-4 rounded-2xl border px-5 py-2.5 transition-colors focus-within:ring-2">
            <i class="fa-solid fa-magnifying-glass text-text-tertiary"></i>
            <input
              type="text"
              className="text-text-primary placeholder:text-text-tertiary w-full bg-transparent text-lg outline-none focus:ring-0"
              placeholder="Type your message here.."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateMessage();
                }
              }}
            />
            <button
              className="cursor-pointer text-lg"
              onClick={() => setShowPicker((prev) => !prev)}
            >
              😊
            </button>
          </div>
          <button
            className="bg-primary hover:bg-primary-hover shadow-glow cursor-pointer rounded-xl px-4 py-2 transition-colors"
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
