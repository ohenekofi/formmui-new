import React from "react";
import { UseFormMethods } from "react-hook-form";

export default ({
  reset,
  defaultValues,
  setEditMode
}: {
  reset: UseFormMethods["reset"];
  defaultValues: any;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <>
    <button
      className="button buttonBlack"
      type="button"
      onClick={() => {
        reset({ ...defaultValues });
        setEditMode(false);
      }}
    >
      Reset Form
    </button>
    <button className="button">submit</button>
  </>
);
