import React, { useState } from "react";
import { useDeletePost } from "../features/FeedPage/useDeletePost";
import Menus from "./Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "./ConfirmDelete";
import PostForm from "../features/FeedPage/PostForm";
import { useCreateLikes } from "../features/profile/useCreateLikes";
import { useDeleteLike } from "../features/profile/useDeleteLike";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useCreateComment } from "../features/profile/useCreateComment";
import ModalDuplicate from "./ModalDuplicate";
import ThreeDotMenu from "./ThreeDotMenu";

const Post = ({ data, metaData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [commentMessage, setCommentMessage] = useState("");
  const navigate = useNavigate();
  const { createComment } = useCreateComment();

  const id = metaData?.[0]?.id;

  const { deletePost } = useDeletePost();
  const { deleteLike } = useDeleteLike();
  const { id: postId, userId } = data;
  console.log(data);

  const { createLike } = useCreateLikes();

  const hasLike = data?.likes?.some(
    (like) => like.postId === postId && like.userId === id,
  );

  function handleLike() {
    if (!hasLike)
      createLike({
        userId: id,
        postId,
      });
    else deleteLike({ userId: id, postId });
  }

  function handlePostComment() {
    if (!commentMessage.trim()) return;
    createComment(
      {
        postId,
        userId: id,
        commentMessage,
      },
      {
        onSettled: () => setCommentMessage(""),
      },
    );
  }

  const menuItems = [
    { label: "Edit", onClick: () => setOpenModal(true) },
    { label: "Delete", onClick: () => setDeleteModal(true) },
  ];

  return (
    <li className="bg-secondary mt-7 gap-2 rounded-xl px-7.5 py-6">
      <div className="flex items-center justify-between">
        <NavLink
          to={`/profile/${data.userMetadata.user_name}`}
          className="flex items-center gap-2"
        >
          <div className="flex gap-3">
            <img
              src={data.userMetadata.user_avatar}
              alt=""
              className="z-10 h-9.5 w-9.5 rounded-md"
            />
            <div className="flex flex-col justify-center gap-0.5">
              <span className="text-text-primary text-sm font-semibold">
                {data.userMetadata.user_name}
              </span>
              <span className="text-text-secondary text-xs font-medium">
                @{data.userMetadata.user_name}
              </span>
            </div>
          </div>
        </NavLink>
        <div>
          <ThreeDotMenu items={menuItems} />
        </div>
      </div>

      <ModalDuplicate
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Create Post"
      >
        <PostForm setOpenModal={setOpenModal} postToEdit={data} />
      </ModalDuplicate>

      <ModalDuplicate
        openModal={deleteModal}
        setOpenModal={setDeleteModal}
        title="Delete"
      >
        <ConfirmDelete
          onCloseModal={() => setDeleteModal(false)}
          onConfirm={() => deletePost(postId)}
        />
      </ModalDuplicate>

      <div className="mt-5">
        <img
          src={data.image}
          alt=""
          className="max-h-[450px] w-full rounded-xl object-cover"
        />
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
            {data?.likes?.length ?? 0}
          </span>
        </button>

        <button
          className="flex gap-1 text-center"
          onClick={() => navigate(`/post-id/${postId}`)}
        >
          <i class="fa-regular fa-comment-dots text-text-primary cursor-pointer text-xl"></i>
          <span className="text-text-primary text-sm font-medium">
            {data?.comments?.length ?? 0}
          </span>
        </button>

        <button className="flex gap-1 text-center">
          <i class="fa-regular fa-paper-plane text-text-primary cursor-pointer text-xl"></i>
          <span className="text-text-primary text-sm font-medium">
            {data?.share ?? 0}
          </span>
        </button>
      </div>

      <div className="mt-5 flex items-center gap-2.5">
        <span className="flex -space-x-1">
          <img
            src="https://img.freepik.com/premium-vector/cute-woman-avatar-profile-vector-illustration_1058532-14546.jpg"
            alt=""
            className="h-6 w-6 rounded-full"
          />
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/654/820/large_2x/vector-woman-face-cartoon.jpg"
            alt=""
            className="h-6 w-6 rounded-full"
          />
          <img
            src="https://img.freepik.com/premium-vector/woman-with-smile-her-face-is-smiling_1025827-108569.jpg"
            alt=""
            className="h-6 w-6 rounded-full"
          />
        </span>
        <div className="flex gap-1">
          <span className="text-text-tertiary font-Montserrat text-sm font-normal">
            Liked by
          </span>
          <span className="text-text-primary font-Montserrat text-sm font-normal">
            mr.beast and 34 others
          </span>
        </div>
      </div>

      <span className="font-Montserrat text-text-secondary mt-2.5 flex text-sm font-medium">
        {data.caption}
      </span>

      <div className="relative mt-5 flex items-center gap-2">
        <img
          src={metaData?.[0]?.user_avatar}
          alt=""
          className="z-10 h-8 w-8 rounded-lg"
        />

        <div className="bg-background flex w-full overflow-hidden rounded-lg px-1 py-1">
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
    </li>
  );
};

export default Post;
