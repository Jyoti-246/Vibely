import React from "react";
import { useAllMetadata } from "./useAllMetadata";
import SuggestedFollower from "../../ui/SuggestedFollower";
import { useUser } from "../authentication/useUser";
import { useMetaData } from "../Messagesfeatures/useMetaData";

const SuggestedFollowers = () => {
  const { user } = useUser();
  const { metaData } = useMetaData(user?.email);

  const { allMetadata, isLoading } = useAllMetadata();

  if (isLoading) return null;

  return (
    <div className="bg-secondary border-border shadow-card flex flex-1 flex-col gap-6 rounded-2xl border p-6">
      <h3 className="font-Montserrat text-text-primary text-sm font-bold tracking-wide">
        Suggestion For You
      </h3>
      <ul className="flex flex-col gap-5">
        {allMetadata?.map((suggestion) => {
          return (
            <SuggestedFollower
              metaData={metaData}
              suggestion={suggestion}
              key={suggestion.id}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default SuggestedFollowers;
