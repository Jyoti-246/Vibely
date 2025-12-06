import { useUpdatePost } from "./useUpdatePost";
import { useCreatePost } from "./useCreatePost";
import { useForm } from "react-hook-form";
import CurrentUserInfo from "../../ui/CurrentUserInfo";
import { FaRegImage } from "react-icons/fa6";
import { useRef, useState } from "react";
import { useUser } from "../authentication/useUser";
import { useMetaData } from "../Messagesfeatures/useMetaData";
import Button from "../../ui/Button";

const PostForm = ({ postToEdit = {}, setOpenModal }) => {
  const fileInputRef = useRef();
  const [preview, setPreview] = useState(null);
  const { isLoading, user } = useUser();
  const { isLoading: isLoadingMetaData, metaData } = useMetaData(user?.email);

  const { id: userId, user_avatar, user_name } = metaData[0];

  const { id: postId, ...updateValues } = postToEdit;
  const isEditSession = Boolean(postId);

  const { createPost } = useCreatePost();
  const { updatePost } = useUpdatePost();
  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues: isEditSession ? updateValues : {},
  });
  const { errors } = formState;

  console.log(updateValues);

  const imageFile = watch("image");

  function handleButtonClick(e) {
    e.preventDefault();
    fileInputRef.current.click();
  }

  function handleImageChange(e) {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image?.[0];
    if (isEditSession) {
      console.log("this is edit session");

      updatePost(
        {
          newPost: { ...data, image: image },
          id: postId,
        },
        { onSuccess: () => setOpenModal(false) },
      );
    } else {
      console.log("this is create session");

      createPost(
        { newPost: { ...data, image: image, userId } },
        {
          onSuccess: () => setOpenModal(false),
        },
      );
    }
  }

  function onError(errors) {
    // console.log(errors);
  }

  if (!metaData || metaData.length === 0 || isLoading || isLoadingMetaData)
    return null;

  return (
    <form
      action=""
      className="bg-secondary flex min-w-md flex-col gap-4 rounded-xl"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <CurrentUserInfo user_avatar={user_avatar} user_name={user_name} />

      <div className="bg-tertiary flex h-40 w-full items-center justify-center rounded-xl">
        {preview === null ? (
          <div className="flex flex-col items-center gap-3">
            <FaRegImage className="text-secondary h-8 w-8" />
            <Button
              label="Select Image"
              className="py-2"
              onClick={handleButtonClick}
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register("image", {
                onChange: (e) => handleImageChange(e),
              })}
              ref={(el) => {
                fileInputRef.current = el;
                register("image").ref(el);
              }}
            />
          </div>
        ) : (
          <img
            src={preview}
            alt="preview"
            className="mt-2 h-40 w-full rounded-xl object-cover"
          />
        )}
      </div>

      <div className="mx-3 mb-3">
        <div>
          <label htmlFor="caption" className="hidden">
            Caption
          </label>
          <textarea
            type="text"
            name="caption"
            id="caption"
            placeholder="Add a caption..."
            className="no-scrollbar w-full pt-3 text-left text-sm focus:border-none focus:outline-none"
            {...register("caption")}
          />
          <span className="text-text-primary text-[1.4rem]">
            {errors?.caption?.message}
          </span>
        </div>

        <button
          type="submit"
          className="bg-primary text-md mt-3 w-full cursor-pointer rounded-md py-1"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
