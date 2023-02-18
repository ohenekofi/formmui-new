import React from "react";
import { Control, Controller } from "react-hook-form";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import { TextField, TextFieldProps } from "@mui/material";
import { postalCodeValidator } from "./validators";

type Props = Omit<NumberFormatProps<TextFieldProps>, "name"> & {
  control: Control<any, object>;
  disableErrorSpace?: boolean;
  name: string;
};

const PostalCodeField = ({
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
      <NumberFormat
        {...restField}
        {...restProps}
        inputRef={ref}
        error={!!error}
        customInput={TextField}
        label={`${label ? `${label}${required ? "*" : ""}` : ""}`}
        //" " Space reserves space under for error message
        helperText={error?.message || (disableErrorSpace ? "" : " ")}
        format="##-###"
        mask="_"
        sx={{
          width: "15ch",
          ...sx
        }}
      />
    )}
    name={name}
    control={control}
    rules={{
      validate: postalCodeValidator(required),
      required: required ? "Required" : ""
    }}
  />
);

export default PostalCodeField;
