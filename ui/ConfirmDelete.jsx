import React from "react";

const ConfirmDelete = ({ resourceName, onConfirm, onCloseModal }) => {
  return (
    <div className="flex w-[30rem] flex-col gap-[1rem] p-4">
      <h3 className="text-xl font-semibold text-stone-600">
        Delete {resourceName}
      </h3>
      <p className="text-lg text-stone-500">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-[1.2rem]">
        <button
          onClick={onCloseModal}
          className="rounded-lg border border-stone-300 px-4 py-2"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="rounded-lg bg-red-700 px-4 py-2 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
