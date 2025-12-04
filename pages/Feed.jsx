import React from "react";
import Stories from "../features/FeedPage/Stories";
import Posts from "../features/FeedPage/Posts";
import Sponsored from "../features/FeedPage/Sponsored";
import RecentMessages from "../features/FeedPage/RecentMessages";
import SuggestedFollowers from "../features/FeedPage/SuggestedFollowers";
import Topbar from "../ui/Topbar";

const Feed = () => {
  return (
    <div className="flex flex-col gap-7 px-10">
      <div className="flex h-screen gap-7">
        <div className="no-scrollbar mt-10 flex-5 overflow-scroll">
          <div className="bg-secondary flex w-full items-center gap-4 rounded-xl px-6 py-5">
            <i class="fa-solid fa-magnifying-glass text-text-secondary h-5.5 w-5.5"></i>
            <input
              type="text"
              className="text-text-secondary text-lg outline-none focus:ring-0"
              placeholder="Search"
            />
          </div>
          <Stories />
          <Posts />
        </div>
        <div className="hidden flex-2 flex-col gap-6 pb-12 lg:flex">
          <Topbar />
          <SuggestedFollowers />
          <RecentMessages />
        </div>
      </div>
    </div>
  );
};

export default Feed;
