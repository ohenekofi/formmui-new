import React from "react";
import { Control, Controller } from "react-hook-form";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import { TextField, TextFieldProps } from "@mui/material";

type Props = Omit<NumberFormatProps<TextFieldProps>, "name"> & {
  control: Control<any, object>;
  disableErrorSpace?: boolean;
  name: string;
};

const CurrencyField = ({
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
      field: { ref, onChange, ...restField },
      fieldState: { error }
    }) => (
      <NumberFormat
        {...restField}
        {...restProps}
        inputRef={ref}
        error={!!error}
        allowNegative={false}
        customInput={TextField}
        label={`${label}${required ? "*" : ""}`}
        //" " Space reserves space under for error message
        helperText={error?.message || (disableErrorSpace ? "" : " ")}
        decimalSeparator=","
        thousandSeparator=" "
        decimalScale={2}
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

export default CurrencyField;
