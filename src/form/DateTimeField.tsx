import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { isValid } from "date-fns";

type Props = Omit<TextFieldProps, "name"> & {
  control: Control<any, object>;
  disableFutureDateTime?: boolean;
  disablePastDateTime?: boolean;
  disableErrorSpace?: boolean;
  name: string;
};

const todayDate = new Date();

const DateTimeField = ({
  control,
  name,
  label,
  disableFutureDateTime,
  disablePastDateTime,
  disableErrorSpace,
  required,
  disabled,
  sx,
  ...restProps
}: Props) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, ...restField }, fieldState: { error } }) => (
        <DesktopDateTimePicker
          {...restField}
          inputRef={ref}
          label={label}
          inputFormat="dd/MM/yyyy HH:mm"
          maxDateTime={disableFutureDateTime ? todayDate : undefined}
          minDateTime={disablePastDateTime ? todayDate : undefined}
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField
              {...params}
              {...restProps}
              error={!!error}
              label={`${label}${required ? "*" : ""}`}
              //" " Space reserves space under for error message
              helperText={error?.message || (disableErrorSpace ? "" : " ")}
              fullWidth
              sx={{
                width: "25ch",
                ...sx
              }}
            />
          )}
        />
      )}
      rules={{
        required: required ? "Required" : "",
        validate: (value) => (value && !isValid(value) ? "Wrong format" : true)
      }}
    />
  </LocalizationProvider>
);

export default DateTimeField;
