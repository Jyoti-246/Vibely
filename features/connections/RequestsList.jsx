import React from "react";
import Request from "../../ui/Request";

const RequestsList = ({ sentRequests }) => {
  if (sentRequests.length === 0) {
    return <h1>No Requests</h1>;
  }

  return (
    <div className="bg-secondary flex flex-1 flex-col gap-6 rounded-xl p-6">
      <h3 className="font-Montserrat text-text-primary text-xs font-extrabold">
        Suggestion For You
      </h3>
      <ul className="no-scrollbar flex flex-col gap-5 overflow-y-auto">
        {sentRequests?.map((request) => {
          return <Request request={request} />;
        })}
      </ul>
    </div>
  );
};

export default RequestsList;
