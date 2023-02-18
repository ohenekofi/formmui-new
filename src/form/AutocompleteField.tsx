import React from "react";
import { Control, Controller } from "react-hook-form";
import { Autocomplete, TextField, TextFieldProps } from "@mui/material";

export interface SelectOption {
  label: string;
  value: unknown;
}

type Props = Omit<TextFieldProps, "name"> & {
  control: Control<any, object>;
  name: string;
  options: SelectOption[];
  disableErrorSpace?: boolean;
  disableClearable?: boolean;
  disabledLabels?: string[];
};

const AutocompleteField = ({
  control,
  name,
  options,
  label,
  required,
  disabled,
  disableClearable,
  disableErrorSpace,
  disabledLabels = [],
  sx,
  ...restProps
}: Props) => (
  <Controller
    render={({
      field: { ref, onChange, ...restField },
      fieldState: { error }
    }) => (
      <Autocomplete
        {...restField}
        disableClearable={disableClearable}
        disabled={disabled}
        options={options}
        autoSelect
        // Default
        // getOptionLabel={(option: SelectOption) => option.label}
        isOptionEqualToValue={(option: SelectOption, selected: SelectOption) =>
          option.value === selected.value
        }
        getOptionDisabled={(option) => disabledLabels.includes(option.label)}
        renderInput={(params) => (
          <TextField
            {...params}
            inputRef={ref}
            label={`${label ? `${label}${required ? "*" : ""}` : ""}`}
            error={!!error}
            //" " Space reserves space under for error message
            helperText={error?.message || (disableErrorSpace ? "" : " ")}
            fullWidth
            sx={{
              width: "25ch",
              ...sx
            }}
          />
        )}
        onChange={(_, data) => onChange(data)}
      />
    )}
    rules={{
      required: required ? "Required" : ""
    }}
    name={name}
    control={control}
  />
);

export default AutocompleteField;
