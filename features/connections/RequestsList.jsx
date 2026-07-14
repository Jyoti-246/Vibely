import React from "react";
import Request from "../../ui/Request";

const RequestsList = ({ sentRequests, userId }) => {
  return (
    <div className="bg-secondary border-border shadow-card flex flex-1 flex-col gap-6 rounded-2xl border p-6">
      <h3 className="font-Montserrat text-text-primary text-sm font-bold tracking-wide">
        Requests For You
      </h3>
      {sentRequests.length === 0 ? (
        <h1 className="text-text-tertiary text-center">No Requests</h1>
      ) : (
        <ul className="no-scrollbar flex flex-col gap-5 overflow-y-auto">
          {sentRequests?.map((request) => {
            return <Request request={request} userId={userId} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default RequestsList;
