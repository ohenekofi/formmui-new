import React from "react";
import { Control, Controller } from "react-hook-form";
import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormControl,
  FormHelperText
} from "@mui/material";

type Props = Omit<CheckboxProps, "name"> & {
  control: Control<any, object>;
  name: string;
  label?: string;
  required?: boolean;
};

const LabeledCheckbox = ({
  control,
  name,
  label,
  required,
  ...restProps
}: Props) => (
  <Controller
    name={name}
    control={control}
    render={({
      field: { ref, value, ...restField },
      fieldState: { error }
    }) => (
      <FormControl required={required} error={!!error} component="fieldset">
        <FormControlLabel
          control={
            <Checkbox
              //Focus on error is not visible
              {...restField}
              {...restProps}
              checked={value}
              inputRef={ref}
            />
          }
          label={`${label ? `${label}${required ? "*" : ""}` : ""}`}
        />
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    )}
    rules={{
      required: required ? "Required" : ""
    }}
  />
);

export default LabeledCheckbox;
