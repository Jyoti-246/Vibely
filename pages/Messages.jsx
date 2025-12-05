import React, { useEffect } from "react";
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

  console.log(allMessages);
  // const reversedMessages = Array.isArray(allMessages)
  //   ? [...allMessages].reverse()
  //   : [];

  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    if (allMessages?.length && !currentChat) {
      setCurrentChat(allMessages[0]);
    }
  }, [allMessages]);

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
    <div className="flex h-screen gap-4 p-6">
      <UsersDidMessages
        metaData={metaData}
        allMessages={allMessages}
        setCurrentChat={setCurrentChat}
      />

      <UserChatBox metaData={metaData} currentChat={currentChat} />
    </div>
  );
};

export default Messages;
