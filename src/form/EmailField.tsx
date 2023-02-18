import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { emailValidator } from "./validators";

type Props = Omit<TextFieldProps, "name"> & {
  control: Control<any, object>;
  disableErrorSpace?: boolean;
  name: string;
};

const EmailField = ({
  control,
  disableErrorSpace,
  name,
  required,
  label,
  sx,
  ...restProps
}: Props) => (
  <Controller
    render={({ field: { ref, ...restField }, fieldState: { error } }) => (
      <TextField
        {...restField}
        {...restProps}
        inputRef={ref}
        error={!!error}
        label={`${label ? `${label}${required ? "*" : ""}` : ""}`}
        //" " Space reserves space under for error message
        helperText={error?.message || (disableErrorSpace ? "" : " ")}
        fullWidth
        sx={{
          width: "25ch",
          ...sx
        }}
      />
    )}
    name={name}
    control={control}
    rules={{
      validate: emailValidator(required),
      required: required ? "Required" : ""
    }}
  />
);

export default EmailField;
