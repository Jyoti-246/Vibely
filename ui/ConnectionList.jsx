import React from "react";
import Connection from "./Connection";

const ConnectionList = ({
  filteredConnections,
  userId,
  currentStatus,
  followings,
}) => {
  if (filteredConnections.length === 0) {
    return (
      <h1 className="text-text-primary mt-10 flex-2 text-center text-2xl">
        No List
      </h1>
    );
  }

  return (
    <ul className="no-scrollbar mt-10 flex flex-2 flex-col gap-2 overflow-y-auto">
      {filteredConnections?.map((request) => {
        return (
          <Connection
            key={request}
            request={request}
            userId={userId}
            currentStatus={currentStatus}
            followings={followings}
          />
        );
      })}
    </ul>
  );
};

export default ConnectionList;
