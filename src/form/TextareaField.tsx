import React from "react";
import { Control, Controller, useWatch } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { textFieldValidator } from "./validators";

type Props = Omit<TextFieldProps, "name"> & {
  control: Control<any, object>;
  disableErrorSpace?: boolean;
  maxLength?: number;
  name: string;
};

const TextareaField = ({
  control,
  maxLength = 2000,
  name,
  minRows = 6,
  label,
  required,
  ...restProps
}: Props) => {
  const value = useWatch({
    control,
    name,
    defaultValue: ""
  });

  return (
    <Controller
      render={({ field: { ref, ...restField }, fieldState: { error } }) => (
        <TextField
          {...restField}
          {...restProps}
          inputRef={ref}
          minRows={minRows}
          error={!!error}
          label={`${label ? `${label}${required ? "*" : ""}` : ""}`}
          multiline
          fullWidth
          helperText={error?.message || `${value.length}/${maxLength}`}
          inputProps={{ maxLength }}
        />
      )}
      name={name}
      control={control}
      rules={{
        validate: textFieldValidator(required),
        required: required ? "Required" : ""
      }}
    />
  );
};

export default TextareaField;
