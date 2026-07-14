import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stories from "../features/FeedPage/Stories";
import Posts from "../features/FeedPage/Posts";
import RecentMessages from "../features/FeedPage/RecentMessages";
import SuggestedFollowers from "../features/FeedPage/SuggestedFollowers";
import Topbar from "../ui/Topbar";

const Feed = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  function handleSearch() {
    const query = search.trim();
    if (!query) return;
    navigate(`/profile/${query}`);
    setSearch("");
  }

  return (
    <div className="flex flex-col gap-7 px-4 md:px-10">
      <div className="flex flex-col gap-7 md:h-screen md:flex-row">
        <div className="no-scrollbar mt-6 flex-5 md:mt-10 md:overflow-scroll">
          <div className="bg-secondary border-border focus-within:border-primary/60 focus-within:ring-primary/15 flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 transition-colors focus-within:ring-2 md:px-6 md:py-4">
            <i
              class="fa-solid fa-magnifying-glass text-text-tertiary h-5.5 w-5.5 cursor-pointer"
              onClick={handleSearch}
            ></i>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="text-text-primary placeholder:text-text-tertiary w-full bg-transparent text-lg outline-none focus:ring-0"
              placeholder="Search a profile by username..."
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
