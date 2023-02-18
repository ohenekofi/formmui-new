import React from "react";
import { Control, Controller } from "react-hook-form";
import {
  FormHelperText,
  RadioGroupProps,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel
} from "@mui/material";

type RadioOption = {
  value: unknown;
  label: string;
};

type Props = Omit<RadioGroupProps, "name"> & {
  control: Control<any, object>;
  name: string;
  label: string;
  options: RadioOption[];
  required?: boolean;
};

const LabeledRadioGroup = ({
  control,
  options,
  name,
  required,
  label
}: Props) => (
  <Controller
    render={({ field: { ref, ...restField }, fieldState: { error } }) => (
      <FormControl error={!!error}>
        <FormLabel>{`${
          label ? `${label}${required ? "*" : ""}` : ""
        }`}</FormLabel>
        <RadioGroup {...restField}>
          {options.map(({ value, label }) => (
            <FormControlLabel
              inputRef={ref}
              key={label}
              value={value}
              //Focus on error is not visible
              control={<Radio />}
              label={label}
            />
          ))}
        </RadioGroup>
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    )}
    name={name}
    control={control}
    rules={{
      required: required ? "Required" : ""
    }}
  />
);

export default LabeledRadioGroup;
