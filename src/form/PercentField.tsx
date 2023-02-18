import React from "react";
import { Control, Controller } from "react-hook-form";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import { TextField, TextFieldProps, InputAdornment } from "@mui/material";

type Props = Omit<NumberFormatProps<TextFieldProps>, "name"> & {
  control: Control<any, object>;
  disableErrorSpace?: boolean;
  name: string;
};

const PercentTextField = (props: TextFieldProps) => (
  <TextField
    {...props}
    InputProps={{
      endAdornment: <InputAdornment position="end">%</InputAdornment>
    }}
  />
);

const PercentField = ({
  control,
  name,
  required,
  label,
  disableErrorSpace,
  sx,
  ...restProps
}: Props) => (
  <Controller
    render={({
      field: { ref, onChange, value, ...restField },
      fieldState: { error }
    }) => (
      <NumberFormat
        {...restField}
        {...restProps}
        inputRef={ref}
        value={value}
        error={!!error}
        allowNegative={false}
        customInput={PercentTextField}
        label={`${label}${required ? "*" : ""}`}
        //" " Space reserves space under for error message
        helperText={error?.message || (disableErrorSpace ? "" : " ")}
        decimalSeparator=","
        decimalScale={value >= 100 ? 0 : 2}
        isAllowed={({ floatValue }) => {
          return !floatValue || floatValue <= 100;
        }}
        onValueChange={({ floatValue }) => onChange(floatValue || "")}
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
      required: required ? "Required" : ""
    }}
  />
);

export default PercentField;
