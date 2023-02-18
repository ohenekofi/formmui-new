import React from "react";
import { Control, Controller } from "react-hook-form";
import NumberFormat, {
  NumberFormatProps,
  NumberFormatValues
} from "react-number-format";
import { TextField, TextFieldProps } from "@mui/material";
import { phoneNumberValidator } from "./validators";

type Props = Omit<NumberFormatProps<TextFieldProps>, "name"> & {
  control: Control<any, object>;
  disableErrorSpace?: boolean;
  name: string;
};

const PhoneNumberField = ({
  control,
  disableErrorSpace,
  name,
  required,
  label,
  sx,
  ...restProps
}: Props) => {
  //add + if phone has 11 digits with country code
  const format = (value: string) => (value.length === 11 ? `+${value}` : value);
  //min 9, max 11 digits
  const isAllowed = ({ value }: NumberFormatValues) => value.length <= 11;

  return (
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
          allowNegative={false}
          format={format}
          isAllowed={isAllowed}
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
        required: required ? "Required" : "",
        validate: phoneNumberValidator(required)
      }}
    />
  );
};

export default PhoneNumberField;
