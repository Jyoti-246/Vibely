import React from "react";
import { BsPlus } from "react-icons/bs";
import Story from "../../ui/Story";
import { useStories } from "./useStories";
import { useFollowers } from "./useFollowers";
import { useUser } from "../authentication/useUser";
import { useMetaData } from "../Messagesfeatures/useMetaData";

const Stories = () => {
  const { isLoading, user } = useUser();
  const { isLoading: isLoadingMetaData, metaData } = useMetaData(user?.email);
  const { followers } = useFollowers(metaData?.[0]?.id);

  const { storiesData } = useStories(followers);

  if (isLoading || isLoadingMetaData) return null;

  return (
    <>
      <ul className="no-scrollbar mt-12 flex gap-3 overflow-x-scroll">
        <li className="bg-secondary flex h-48 w-38 shrink-0 flex-col items-center justify-center gap-4 rounded-xl text-sm font-semibold">
          <span className="">
            <BsPlus className="text-text-primary bg-primary h-9 w-9 rounded-full" />
          </span>
          <span className="text-text-primary">Create Story</span>
        </li>
        {storiesData?.map((storyData) => {
          return <Story data={storyData} key={storyData.id} />;
        })}
      </ul>
    </>
  );
};

export default Stories;
