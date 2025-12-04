import React from "react";
import { useAllMetadata } from "./useAllMetadata";
import SuggestedFollower from "../../ui/SuggestedFollower";
import { useUser } from "../authentication/useUser";
import { useMetaData } from "../Messagesfeatures/useMetaData";

const SuggestedFollowers = () => {
  const { user } = useUser();
  const { metaData } = useMetaData(user?.email);
  console.log(metaData);

  const { allMetadata, isLoading } = useAllMetadata();

  if (isLoading) return null;

  console.log(allMetadata);

  return (
    <div className="bg-secondary flex flex-1 flex-col gap-6 rounded-xl p-6">
      <h3 className="font-Montserrat text-text-primary text-xs font-extrabold">
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
