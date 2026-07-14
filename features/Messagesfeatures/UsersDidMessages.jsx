import React from "react";
import Message from "../../ui/Message";

const UsersDidMessages = ({ metaData, allMessages, setCurrentChat }) => {
  return (
    <div className="flex w-full min-w-0 flex-1 flex-col gap-4">
      <h1 className="text-text-primary text-2xl font-bold">
        {metaData?.[0]?.user_name}
      </h1>
      <div className="bg-secondary border-border focus-within:border-primary/60 focus-within:ring-primary/15 flex w-full items-center gap-2 rounded-2xl border px-4 py-2.5 transition-colors focus-within:ring-2 md:px-6">
        <i class="fa-solid fa-magnifying-glass text-text-tertiary"></i>
        <input
          type="text"
          className="text-text-primary placeholder:text-text-tertiary w-full bg-transparent text-lg outline-none focus:ring-0"
          placeholder="Search"
        />
      </div>
      <div className="bg-secondary border-border shadow-card no-scrollbar flex flex-1 flex-col gap-5 overflow-y-auto rounded-2xl border p-4 md:p-6">
        {allMessages?.length ? (
          <ul className="flex flex-col gap-5">
            {allMessages.map((message) => {
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
        ) : (
          <div className="text-text-tertiary flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center">
            <i class="fa-regular fa-comments text-3xl"></i>
            <p className="text-sm font-medium">No conversations yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersDidMessages;
