import React from "react";
import Request from "../../ui/Request";

const RequestsList = ({ sentRequests, userId }) => {
  console.log(sentRequests);

  return (
    <div className="bg-secondary flex flex-1 flex-col gap-6 rounded-xl p-6">
      <h3 className="font-Montserrat text-text-primary text-xs font-extrabold">
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
