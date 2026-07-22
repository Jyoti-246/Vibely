import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useMetaData } from "../features/Messagesfeatures/useMetaData";

import UsersDidMessages from "../features/Messagesfeatures/UsersDidMessages";
import UserChatBox from "../features/Messagesfeatures/UserChatBox";
import { useUserAllMessages } from "../features/Messagesfeatures/useUserAllMessages";
import { useState } from "react";
// import { useUpdateSeenMessage } from "../features/Messagesfeatures/useUpdateSeenMessage";

const Messages = () => {
  const { isLoading, user } = useUser();

  const { isLoading: isLoadingMetaData, metaData } = useMetaData(user?.email);

  const userId = metaData?.[0].id;

  const { isLoading: isLoadingMessages, allMessages } =
    useUserAllMessages(userId);

  // Most recent conversation first.
  const sortedMessages = Array.isArray(allMessages)
    ? [...allMessages].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      )
    : [];

  const [currentChat, setCurrentChat] = useState(null);
  // On mobile only one pane is visible at a time: the conversation list or
  // the open chat. On md+ both panes are always shown side by side.
  const [mobileView, setMobileView] = useState("list");

  // Opened from a profile's "Message" button — start a chat with that user
  // even if there's no prior conversation.
  const location = useLocation();
  const chatUser = location.state?.chatUser;

  useEffect(() => {
    if (chatUser && userId) {
      setCurrentChat({ sender: { id: userId }, receiver: chatUser });
      setMobileView("chat");
    }
  }, [chatUser, userId]);

  useEffect(() => {
    if (!chatUser && sortedMessages.length && !currentChat) {
      setCurrentChat(sortedMessages[0]);
    }
  }, [allMessages]);

  function handleSelectChat(chat) {
    setCurrentChat(chat);
    setMobileView("chat");
  }

  if (isLoading || isLoadingMetaData || isLoadingMessages) return null;

  if (
    !metaData ||
    metaData.length === 0 ||
    isLoading ||
    !metaData ||
    metaData.length === 0
  )
    return null;

  return (
    <div className="flex h-[calc(100dvh-4rem)] gap-4 overflow-hidden p-3 md:h-screen md:p-6">
      <div
        className={`${
          mobileView === "chat" ? "hidden" : "flex"
        } w-full md:flex md:w-auto md:flex-1`}
      >
        <UsersDidMessages
          metaData={metaData}
          allMessages={sortedMessages}
          setCurrentChat={handleSelectChat}
        />
      </div>

      <div
        className={`${
          mobileView === "list" ? "hidden" : "flex"
        } w-full md:flex md:w-auto md:flex-2`}
      >
        <UserChatBox
          metaData={metaData}
          currentChat={currentChat}
          onBack={() => setMobileView("list")}
        />
      </div>
    </div>
  );
};

export default Messages;
