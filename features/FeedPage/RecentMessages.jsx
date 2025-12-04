import React from "react";
import Message from "../../ui/Message";
import { useUser } from "../authentication/useUser";
import { useMetaData } from "../Messagesfeatures/useMetaData";
import { useUserAllMessages } from "../Messagesfeatures/useUserAllMessages";

const RecentMessages = () => {
  const { isLoading, user } = useUser();

  const { isLoading: isLoadingMetaData, metaData } = useMetaData(user?.email);

  const userId = metaData?.[0].id;

  const { isLoading: isLoadingMessages, allMessages: allMessagesComes } =
    useUserAllMessages(userId);

  const allMessages = allMessagesComes?.filter(
    (message) => metaData?.[0]?.id === message?.receiver?.id,
  );

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
    <div className="bg-secondary flex flex-1 flex-col gap-6 rounded-xl p-6">
      <h3 className="font-Montserrat text-text-primary text-xs font-extrabold">
        Recent Messages
      </h3>
      <ul className="flex flex-col gap-5">
        {allMessages?.map((message) => {
          return <Message message={message} key={message.id} />;
        })}
      </ul>
    </div>
  );
};

export default RecentMessages;
