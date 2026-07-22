import React from "react";
import { Link } from "react-router-dom";

const EmptyFeed = () => {
  return (
    <div className="bg-secondary mt-5 flex flex-col items-center rounded-2xl px-8 py-14 text-center shadow">
      <div className="mb-6 rounded-full bg-violet-100 p-4 text-2xl">✨</div>

      <h2 className="text-text-primary text-2xl font-bold">
        Welcome to Vibely! 🎉
      </h2>

      <p className="mt-3 max-w-md text-stone-500">
        Your feed is empty because you're not following anyone yet.
        <br />
        Discover amazing creators and start following them to personalize your
        feed.
      </p>

      <Link
        to="/discover"
        className="bg-primary hover:bg-primary-hover mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition"
      >
        <span className="text-xl">👥</span> Discover People
      </Link>
    </div>
  );
};

export default EmptyFeed;
