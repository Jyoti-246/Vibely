import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import Story from "../../ui/Story";
import StoryViewer from "../../ui/StoryViewer";
import StoryForm from "./StoryForm";
import ModalDuplicate from "../../ui/ModalDuplicate";
import { useStories } from "./useStories";
import { useFollowers } from "./useFollowers";
import { useUser } from "../authentication/useUser";
import { useMetaData } from "../Messagesfeatures/useMetaData";

const Stories = () => {
  const { isLoading, user } = useUser();
  const { isLoading: isLoadingMetaData, metaData } = useMetaData(user?.email);
  const { followers } = useFollowers(metaData?.[0]?.id);

  const { storiesData } = useStories(followers);

  const [activeStory, setActiveStory] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);

  if (isLoading || isLoadingMetaData) return null;

  const currentUser = metaData?.[0];

  return (
    <>
      <ul className="no-scrollbar mt-8 flex gap-4 overflow-x-scroll md:mt-12">
        <li
          onClick={() => setOpenCreate(true)}
          className="font-Montserrat flex w-16 shrink-0 cursor-pointer flex-col items-center gap-1.5"
        >
          <div className="relative">
            <div className="border-border rounded-full border p-[2.5px]">
              <img
                src={currentUser?.user_avatar}
                alt=""
                className="h-14 w-14 rounded-full object-cover"
              />
            </div>
            <span className="bg-primary border-background absolute right-0 bottom-0 flex h-5 w-5 items-center justify-center rounded-full border-2">
              <BsPlus className="text-text-primary h-4 w-4" />
            </span>
          </div>
          <span className="text-text-secondary w-full truncate text-center text-[11px] font-medium">
            Your Story
          </span>
        </li>

        {storiesData?.map((storyData) => {
          return (
            <Story
              data={storyData}
              key={storyData.id}
              onClick={() => setActiveStory(storyData)}
            />
          );
        })}
      </ul>

      <StoryViewer
        story={activeStory}
        onClose={() => setActiveStory(null)}
        currentUserId={currentUser?.id}
      />

      <ModalDuplicate
        openModal={openCreate}
        setOpenModal={setOpenCreate}
        title="Add to your story"
      >
        <StoryForm userId={currentUser?.id} setOpenModal={setOpenCreate} />
      </ModalDuplicate>
    </>
  );
};

export default Stories;
