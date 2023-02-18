import React from "react";
import { Control, Controller } from "react-hook-form";
import {
  Switch,
  SwitchProps,
  FormControlLabel,
  FormControl
} from "@mui/material";

type Props = Omit<SwitchProps, "name"> & {
  control: Control<any, object>;
  name: string;
  label?: string;
};

const LabeledSwitch = ({ control, name, label, ...restProps }: Props) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { ref, value, ...restField } }) => (
      <FormControl component="fieldset">
        <FormControlLabel
          control={
            <Switch
              //Focus on error is not visible
              {...restField}
              {...restProps}
              checked={value}
              inputRef={ref}
            />
          }
          label={label}
        />
      </FormControl>
    )}
  />
);

export default LabeledSwitch;
