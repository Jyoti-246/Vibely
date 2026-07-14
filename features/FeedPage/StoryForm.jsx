import { useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import Button from "../../ui/Button";
import { useCreateStory } from "./useCreateStory";

const StoryForm = ({ userId, setOpenModal }) => {
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { createStory, isCreating } = useCreateStory();

  function handleSelect(e) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;
    createStory(
      { userId, storyImage: file },
      { onSuccess: () => setOpenModal(false) },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="bg-tertiary border-border flex h-64 w-full items-center justify-center overflow-hidden rounded-xl border border-dashed">
        {preview ? (
          <img
            src={preview}
            alt="story preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <FaRegImage className="text-text-tertiary h-8 w-8" />
            <Button
              label="Select Image"
              className="py-2"
              onClick={(e) => {
                e.preventDefault();
                fileRef.current.click();
              }}
            />
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleSelect}
        />
      </div>

      <button
        type="submit"
        disabled={!file || isCreating}
        className="bg-primary hover:bg-primary-hover shadow-glow cursor-pointer rounded-lg py-2 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isCreating ? "Sharing..." : "Share Story"}
      </button>
    </form>
  );
};

export default StoryForm;
