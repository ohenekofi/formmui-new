import React from "react";
import { Control, Controller } from "react-hook-form";
import { MenuItem, TextField, TextFieldProps } from "@mui/material";

export interface SelectOption {
  label: string;
  value: number | string;
}

type Props = Omit<TextFieldProps, "name"> & {
  name: string;
  control: Control<any, object>;
  options: SelectOption[];
  disableErrorSpace?: boolean;
  enableClearable?: boolean;
};

const SelectField = ({
  control,
  name,
  label,
  required,
  options,
  sx,
  enableClearable,
  disableErrorSpace,
  ...restProps
}: Props) => {
  const selectOptions = [
    ...(enableClearable ? [{ label: "", value: "" }] : []),
    ...options
  ];
  return (
    <Controller
      render={({ field: { ref, ...restField }, fieldState: { error } }) => (
        <TextField
          {...restField}
          {...restProps}
          inputRef={ref}
          select
          error={!!error}
          label={`${label ? `${label}${required ? "*" : ""}` : ""}`}
          //" " Space reserves space under for error message
          helperText={error?.message || (disableErrorSpace ? "" : " ")}
          sx={{
            width: "25ch",
            ...sx
          }}
        >
          {selectOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
      name={name}
      control={control}
      rules={{
        required: required ? "Required" : ""
      }}
    />
  );
};

export default SelectField;
