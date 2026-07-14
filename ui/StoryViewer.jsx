import React, { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { FaHeart, FaRegHeart, FaPaperPlane, FaTrash } from "react-icons/fa";
import { useCreateMessage } from "../features/Messagesfeatures/useCreateMessage";
import { useDeleteStory } from "../features/FeedPage/useDeleteStory";

const StoryViewer = ({ story, onClose, currentUserId }) => {
  const [liked, setLiked] = useState(false);
  const [reply, setReply] = useState("");
  const { createMessage } = useCreateMessage();
  const { deleteStory } = useDeleteStory();

  // Close on Escape (web) — harmless on mobile.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Reset transient state whenever a different story is opened.
  useEffect(() => {
    setLiked(false);
    setReply("");
  }, [story?.id]);

  if (!story) return null;

  const authorId = story.userId;
  const authorName = story.userMetadata?.user_name || "story";
  const isOwnStory = authorId === currentUserId;

  function handleDelete() {
    if (!window.confirm("Delete this story?")) return;
    deleteStory(story.id, { onSuccess: onClose });
  }

  function handleSendReply() {
    const message = reply.trim();
    if (!message) return;
    createMessage(
      { fromUser: currentUserId, toUser: authorId, message },
      { onSuccess: () => setReply("") },
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 h-[100dvh] w-full overflow-hidden bg-black"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Blurred fill so the story always covers the full screen */}
      <img
        src={story.storyImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
      />

      {/* Actual story, fully visible on top of the fill */}
      <img
        src={story.storyImage}
        alt=""
        className="absolute inset-0 h-full w-full object-contain"
      />

      {/* Top: author + close */}
      <div
        className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 bg-gradient-to-b from-black/70 to-transparent p-4 md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex min-w-0 items-center gap-2">
          <img
            src={story.userMetadata?.user_avatar}
            alt=""
            className="h-10 w-10 shrink-0 rounded-full border border-white/70 object-cover"
          />
          <span className="truncate text-sm font-semibold text-white">
            {story.userMetadata?.user_name}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          {isOwnStory && (
            <button
              onClick={handleDelete}
              className="cursor-pointer text-white transition-colors hover:text-red-500"
              aria-label="Delete story"
            >
              <FaTrash className="text-xl" />
            </button>
          )}
          <button
            onClick={onClose}
            className="cursor-pointer text-white transition-opacity hover:opacity-80"
            aria-label="Close story"
          >
            <HiXMark className="text-3xl" />
          </button>
        </div>
      </div>

      {/* Bottom: reply + like (shown for every story) */}
      <div
        className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2.5 backdrop-blur-sm focus-within:border-white/80">
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendReply()}
            placeholder={`Reply to ${authorName}...`}
            className="w-full bg-transparent text-sm text-white placeholder:text-white/60 outline-none"
          />
          {reply.trim() && (
            <button
              onClick={handleSendReply}
              className="shrink-0 cursor-pointer text-white transition-transform hover:scale-110"
              aria-label="Send reply"
            >
              <FaPaperPlane />
            </button>
          )}
        </div>
        <button
          onClick={() => setLiked((v) => !v)}
          className="shrink-0 cursor-pointer text-3xl transition-transform hover:scale-110 active:scale-95"
          aria-label={liked ? "Unlike story" : "Like story"}
        >
          {liked ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default StoryViewer;
