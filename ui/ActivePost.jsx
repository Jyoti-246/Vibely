import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCurrentActivePost } from "../features/profile/useCurrentActivePost";
import Comment from "./Comment";
import { useUser } from "../features/authentication/useUser";
import { useMetaData } from "../features/Messagesfeatures/useMetaData";
import { useDeleteLike } from "../features/profile/useDeleteLike";
import { useCreateLikes } from "../features/profile/useCreateLikes";
import { useCreateComment } from "../features/profile/useCreateComment";
import Button from "./Button";
import CurrentUserInfo from "./CurrentUserInfo";

const ActivePost = () => {
  const [commentMessage, setCommentMessage] = useState("");
  const { postId: stringPostId } = useParams();
  const postId = Number(stringPostId);
  const { user } = useUser();
  const { metaData } = useMetaData(user?.email);
  const userId = metaData?.[0]?.id;

  const { post } = useCurrentActivePost(postId);

  const { createLike } = useCreateLikes();
  const { deleteLike } = useDeleteLike();
  const { createComment } = useCreateComment();

  const user_avatar = post?.userMetadata?.user_avatar;
  const user_name = post?.userMetadata?.user_name;

  const hasLike = post?.likes?.some(
    (like) => like.postId === postId && like.userId === userId,
  );

  function handleLike() {
    if (!hasLike)
      createLike({
        userId,
        postId,
      });
    else deleteLike({ userId, postId });
  }

  function handlePostComment() {
    if (!commentMessage.trim()) return;
    createComment(
      {
        postId,
        userId,
        commentMessage,
      },
      {
        onSettled: () => setCommentMessage(""),
      },
    );
  }
  return (
    <div className="bg-secondary border-border shadow-card mx-3 my-6 flex flex-col rounded-2xl border md:mx-10 md:my-10 md:h-160 md:flex-row lg:mx-40">
      <div className="md:flex-2">
        <img
          src={post?.image}
          alt=""
          className="h-64 w-full rounded-t-2xl object-cover md:h-full md:rounded-l-2xl md:rounded-tr-none"
        />
      </div>
      <div className="flex flex-1 flex-col p-3">
        <CurrentUserInfo
          user_avatar={user_avatar}
          user_name={user_name}
          email={post?.caption}
        />
        <ul className="no-scrollbar bg-background border-border my-5 flex max-h-72 flex-1 flex-col gap-2 overflow-scroll rounded-xl border p-3 md:max-h-none">
          {post?.comments
            ?.slice()
            .reverse()
            .map((comment) => {
              return <Comment comment={comment} key={post.id} />;
            })}
        </ul>

        <div className="relative flex items-center gap-2">
          <img
            src={metaData?.[0]?.user_avatar}
            alt=""
            className="z-10 h-8 w-8 rounded-lg"
          />

          <div className="bg-tertiary border-border flex w-full items-center overflow-hidden rounded-xl border px-1.5 py-1">
            <input
              type="text"
              className="text-text-secondary flex-1 border-0 bg-transparent px-1 text-sm font-medium outline-none focus:ring-0"
              placeholder="Post a comment.."
              value={commentMessage}
              onChange={(e) => setCommentMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePostComment()}
            />

            <Button label="Comment" onClick={handlePostComment} />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-5">
          <button className="flex gap-1 text-center">
            {hasLike ? (
              <i
                class="fa-solid fa-heart cursor-pointer text-xl text-red-500"
                onClick={handleLike}
              ></i>
            ) : (
              <i
                class="fa-regular fa-heart text-text-primary cursor-pointer text-xl hover:text-red-500"
                onClick={handleLike}
              ></i>
            )}
            <span className="text-text-primary text-sm font-medium">
              {post?.likes?.length ?? 0}
            </span>
          </button>

          <button className="flex gap-1 text-center">
            <i class="fa-regular fa-comment-dots text-text-primary cursor-pointer text-xl"></i>
            <span className="text-text-primary text-sm font-medium">
              {post?.comments?.length ?? 0}
            </span>
          </button>

          <button className="flex gap-1 text-center">
            <i class="fa-regular fa-paper-plane text-text-primary cursor-pointer text-xl"></i>
            <span className="text-text-primary text-sm font-medium">
              {post?.share ?? 0}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivePost;
