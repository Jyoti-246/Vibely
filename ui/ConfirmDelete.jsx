import React from "react";
import Button from "./Button";

const ConfirmDelete = ({ onConfirm, onCloseModal }) => {
  return (
    <div className="flex max-w-100 flex-col">
      <p className="text-text-secondary text-lg">
        Are you sure you want to delete this permanently? This action cannot be
        undone.
      </p>

      <div className="flex justify-end gap-4">
        <Button
          label="Cancel"
          onClick={onCloseModal}
          className="bg-secondary border-text-primary border py-2"
        />
        <Button
          label="Delete"
          onClick={onConfirm}
          className="bg-red-700 py-2"
        />
      </div>
    </div>
  );
};

export default ConfirmDelete;
