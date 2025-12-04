import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCurrentActivePost } from "../features/profile/useCurrentActivePost";
import { IoHeart, IoHeartOutline, IoShareSocialOutline } from "react-icons/io5";
import { BiMessageRounded } from "react-icons/bi";
import Comment from "./Comment";
import { useUser } from "../features/authentication/useUser";
import { useMetaData } from "../features/Messagesfeatures/useMetaData";
import { useDeleteLike } from "../features/profile/useDeleteLike";
import { useCreateLikes } from "../features/profile/useCreateLikes";
import { useCreateComment } from "../features/profile/useCreateComment";

const ActivePost = () => {
  const [commentMessage, setCommentMessage] = useState("");
  const { postId: stringPostId } = useParams();
  const postId = Number(stringPostId);
  const { user } = useUser();
  const { metaData } = useMetaData(user?.email);
  const userId = metaData?.[0]?.id;

  const { post } = useCurrentActivePost(postId);

  console.log(post);

  const { createLike } = useCreateLikes();
  const { deleteLike } = useDeleteLike();
  const { createComment } = useCreateComment();

  const user_avatar = post?.userMetadata?.user_avatar;
  const user_name = post?.userMetadata?.user_name;

  const hasLike = post?.likes?.some(
    (like) => like.postId === postId && like.userId === userId,
  );

  function handleLike() {
    console.log(hasLike);
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
    <div className="mx-40 my-10 flex h-160 w-220 rounded-2xl bg-amber-200">
      <div className="h-160 w-120">
        <img src={post?.image} alt="" className="h-full w-full rounded-2xl" />
      </div>
      <div className="flex flex-col px-3">
        <div className="h-140">
          <div className="mx-2 mt-2 flex">
            <img
              src={user_avatar}
              alt=""
              className="z-10 m-1 h-10 w-10 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">{user_name}</span>
            </div>
          </div>
          <div className="mx-2 mt-2 flex">
            <img
              src={user_avatar}
              alt=""
              className="z-10 m-1 h-10 w-10 rounded-full"
            />
            <div className="flex gap-1">
              <span className="font-semibold text-gray-800">{user_name}</span>
              <span className="text-gray-700">{post?.caption}</span>
            </div>
          </div>

          <ul className="no-scrollbar h-[55vh] overflow-scroll">
            {post?.comments?.map((comment) => {
              return <Comment comment={comment} key={post.id} />;
            })}
          </ul>
        </div>
        <div>
          <input
            type="text"
            value={commentMessage}
            placeholder="Enter your comment"
            onChange={(e) => setCommentMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePostComment()}
          />
          <button onClick={handlePostComment}>Comment</button>
        </div>
        <div className="mt-3 flex gap-3 border-t pt-3 text-xl text-stone-500">
          <button className="flex items-center gap-1 transition">
            {hasLike ? (
              <IoHeart
                className="cursor-pointer text-red-500"
                onClick={handleLike}
              />
            ) : (
              <IoHeartOutline
                className="cursor-pointer hover:text-red-500"
                onClick={handleLike}
              />
            )}
            <span>{post?.likes?.length ?? 0}</span>
          </button>
          <button className="flex cursor-pointer items-center gap-1 transition hover:text-blue-500">
            <BiMessageRounded />
            <span>{post?.comments?.length ?? 0}</span>
          </button>

          <button className="flex cursor-pointer items-center gap-1 transition hover:text-green-600">
            <IoShareSocialOutline />
            <span>{post?.share ?? 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivePost;
