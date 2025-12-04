import React from "react";
import Message from "../../ui/Message";

const UsersDidMessages = ({ metaData, allMessages, setCurrentChat }) => {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-text-primary text-2xl">{metaData?.[0]?.user_name}</h1>
      <div className="bg-secondary flex w-full items-center gap-2 rounded-2xl px-6 py-2">
        <i class="fa-solid fa-magnifying-glass text-text-secondary text-md"></i>
        <input
          type="text"
          className="text-text-primary text-lg outline-none focus:ring-0"
          placeholder="Search"
        />
      </div>
      <div className="bg-secondary flex flex-col gap-5 rounded-2xl p-6">
        <ul className="flex flex-col gap-5">
          {allMessages?.map((message) => {
            return (
              <Message
                message={message}
                metaData={metaData}
                key={message.id}
                setCurrentChat={setCurrentChat}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default UsersDidMessages;
