import { useNavigate } from "react-router-dom";
import { useUpdatePost } from "./useUpdatePost";
import { useCreatePost } from "./useCreatePost";
import { useForm } from "react-hook-form";
import CurrentUserInfo from "../../ui/CurrentUserInfo";
import { FaRegImage } from "react-icons/fa6";
import { useState } from "react";
import { useUser } from "../authentication/useUser";
import { useMetaData } from "../Messagesfeatures/useMetaData";

const PostForm = ({ postToEdit = {}, onCloseModal }) => {
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
  const navigate = useNavigate();

  const imageFile = watch("image");

  function handleImageChange(e) {
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
        { onSuccess: () => navigate("/") },
      );
    } else {
      console.log("this is create session");

      createPost(
        { newPost: { ...data, image: image, userId } },
        {
          onSuccess: () => navigate("/"),
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
      className="flex w-md flex-col"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <h1 className="rounded-t-xl bg-indigo-500 p-3 text-center text-xl font-semibold text-white">
        Create Post
      </h1>
      <CurrentUserInfo user_avatar={user_avatar} user_name={user_name} />

      <div className="mx-3 mb-3">
        <div>
          <label htmlFor="caption" className="hidden">
            Caption
          </label>
          <input
            type="text"
            name="caption"
            id="caption"
            placeholder="Enter your caption"
            className="no-scrollbar w-full text-left text-sm focus:border-none focus:outline-none"
            {...register("caption")}
          />
          <span className="text-[1.4rem] text-black">
            {errors?.caption?.message}
          </span>
        </div>
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="h-xl mt-2 w-xl rounded object-contain"
          />
        )}
        <div>
          <label htmlFor="image" className="cursor-pointer">
            <FaRegImage className="h-8 w-8 text-green-800" />
          </label>

          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="none text-sm font-medium text-gray-500"
            {...register("image")}
            onChange={handleImageChange}
          />
        </div>
        <button
          type="submit"
          className="mt-3 w-full cursor-pointer rounded-md bg-indigo-500 py-2 text-xl text-white"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PostForm;
