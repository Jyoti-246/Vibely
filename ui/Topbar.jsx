import React from "react";
import { useUser } from "../features/authentication/useUser";
import { useMetaData } from "../features/Messagesfeatures/useMetaData";
import { useMessages } from "../features/Messagesfeatures/useMessages";

const Topbar = () => {
  const { user } = useUser();
  const { metaData } = useMetaData(user?.email);
  const { messagesData } = useMessages(metaData?.[0]?.id);

  const notificationLength = messagesData?.length;

  return (
    <div className="mt-10 flex items-center justify-end gap-7">
      <div className="bg-secondary border-border hover:border-primary/50 hover:text-text-primary cursor-pointer rounded-xl border p-4.5 text-center transition-colors">
        <i class="fa-solid fa-bell text-text-secondary cursor-pointer text-2xl"></i>
      </div>

      <div className="bg-secondary border-border hover:border-primary/50 relative cursor-pointer rounded-xl border p-4.5 text-center transition-colors">
        <i class="fa-solid fa-comment-dots text-text-secondary cursor-pointer text-2xl"></i>
        {notificationLength > 0 && (
          <span className="absolute top-1 right-3 rounded-full bg-red-500 px-2 py-1 text-xs">
            {notificationLength}
          </span>
        )}
      </div>

      <img
        src={metaData?.[0]?.user_avatar}
        alt=""
        className="border-border z-10 h-15 w-15 rounded-xl border object-cover"
      />
    </div>
  );
};

export default Topbar;
