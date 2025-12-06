import React from "react";
import ConnectionList from "../ui/ConnectionList";
import { NavLink, useSearchParams } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useMetaData } from "../features/Messagesfeatures/useMetaData";
import { useAllFollowers } from "../features/connections/useAllFollowers";
import RequestsList from "../features/connections/RequestsList";

const ConnectionsPage = () => {
  const [params, setParams] = useSearchParams();
  const currentStatus = params.get("status") || "requests";

  const { user } = useUser();
  const { metaData } = useMetaData(user?.email);
  const userId = metaData?.[0]?.id;

  const { allFollowers } = useAllFollowers(userId);

  const followersList = Array.isArray(allFollowers) ? allFollowers : [];

  const followings = followersList
    ?.filter(
      (follower) =>
        follower.followingId === userId && follower.status === "accepted",
    )
    .map((follower) => follower.followerId);

  let filteredConnections = [];
  let sentRequests = followersList
    ?.filter(
      (follower) =>
        follower.followerId === userId && follower.status === "requested",
    )
    .map((follower) => follower.followingId);

  if (currentStatus === "following") {
    filteredConnections = followersList
      ?.filter(
        (follower) =>
          follower.followingId === userId && follower.status === "accepted",
      )
      .map((follower) => follower.followerId);
  }

  if (currentStatus === "followers")
    filteredConnections = followersList
      ?.filter(
        (follower) =>
          follower.followerId === userId && follower.status === "accepted",
      )
      .map((follower) => follower.followingId);

  return (
    <div className="flex h-screen flex-col px-10 py-10">
      <h1 className="text-text-primary text-4xl font-bold">Connections</h1>
      <div className="mt-8 flex w-fit gap-6">
        <NavLink
          className={`pb-2 font-medium transition-all ${
            currentStatus === "followers"
              ? "border-text-primary text-text-primary border-b-2"
              : "text-text-secondary"
          }`}
          to={`?status=followers`}
        >
          My Followers
        </NavLink>

        <NavLink
          className={`pb-2 font-medium transition-all ${
            currentStatus === "following"
              ? "border-text-primary text-text-primary border-b-2"
              : "text-text-secondary"
          }`}
          to={`?status=following`}
        >
          My Following
        </NavLink>
      </div>
      <div className="flex gap-6 overflow-y-auto">
        <ConnectionList
          filteredConnections={filteredConnections}
          userId={userId}
          currentStatus={currentStatus}
          followings={followings}
        />
        <RequestsList sentRequests={sentRequests} userId={userId} />
      </div>
    </div>
  );
};

export default ConnectionsPage;
