import React from "react";
import { Control, Controller } from "react-hook-form";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField, TextFieldProps } from "@mui/material";
import { format, isValid } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

type Props = Omit<TextFieldProps, "name"> & {
  control: Control<any, object>;
  disableFutureDate?: boolean;
  disablePastDate?: boolean;
  disableErrorSpace?: boolean;
  name: string;
};

const todayDate = new Date();
const dateFormatSource = "yyyy-MM-dd";

const DateField = ({
  control,
  name,
  label,
  disableFutureDate,
  disablePastDate,
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
        <DesktopDatePicker
          {...restField}
          inputRef={ref}
          label={label}
          inputFormat="dd/MM/yyyy"
          maxDate={disableFutureDate ? todayDate : undefined}
          minDate={disablePastDate ? todayDate : undefined}
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

export default DateField;
