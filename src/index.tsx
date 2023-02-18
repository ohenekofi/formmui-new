import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import { useForm, SubmitHandler } from "react-hook-form";
import Header from "./Header";

import ButtonsResult from "./ButtonsResult";

import "./styles.css";
import {
  createTheme,
  ThemeProvider,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";
import InputField from "./form/InputField";
import EmailField from "./form/EmailField";
import PhoneNumberField from "./form/PhoneNumberField";
import PostalCodeField from "./form/PostalCodeField";
import LabeledCheckbox from "./form/LabeledCheckbox";
import LabeledRadioGroup from "./form/LabeledRadioGroup";
import SelectField from "./form/SelectField";
import AutocompleteField, { SelectOption } from "./form/AutocompleteField";
import CurrencyField from "./form/CurrencyField";
import DateField from "./form/DateField";
import TextareaField from "./form/TextareaField";
import DateTimeField from "./form/DateTimeField";
import LabeledSwitch from "./form/LabeledSwitch";
import PercentField from "./form/PercentField";

let renderCount = 0;

const goingOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "Maybe", value: "maybe" }
];

const mealOptions = [
  {
    value: "breakfast",
    label: "Breakfast"
  },
  {
    value: "dinner",
    label: "Dinner"
  },
  {
    value: "supper",
    label: "Supper"
  }
];

type FormValues = {
  firstName: string;
  email: string;
  phoneNumber: string;
  postalCode: string;
  isConfirm: boolean;
  going: string;
  meal: string;
  meal2: SelectOption | null;
  currency: unknown; //number or empty string for isDirty flag to work
  percent: unknown;
  date: string | null;
  datetime: Date | null;
  notes: string;
  switch: boolean;
};

const defaultValues = {
  firstName: "",
  email: "",
  phoneNumber: "",
  postalCode: "",
  isConfirm: false,
  going: "",
  meal: "",
  meal2: null,
  currency: "",
  percent: "",
  date: null,
  datetime: null,
  notes: "",
  switch: false
};

const editValues = {
  firstName: "John",
  email: "example@example.com",
  phoneNumber: "+48123456789",
  postalCode: "11-111",
  isConfirm: true,
  going: goingOptions[0].value,
  meal: mealOptions[0].value,
  meal2: mealOptions[0],
  currency: 111111111.22,
  percent: 50.56,
  date: new Date(),
  datetime: new Date(),
  notes: "Notes",
  switch: true
};

function App() {
  const [editMode, setEditMode] = useState(false);

  type Variant = "standard" | "outlined";
  const [variant, setVariant] = useState<Variant>("outlined");

  const theme = createTheme({
    palette: {
      mode: "dark"
    },
    components: {
      MuiTextField: {
        defaultProps: {
          variant
        }
      },
      MuiSelect: {
        defaultProps: {
          variant
        }
      }
    }
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty, dirtyFields }
    // watch
  } = useForm<FormValues>({
    defaultValues
  });

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  // React.useEffect(() => {
  //   const subscription = watch((value, { name, type }) =>
  //     console.log(value, name, type)
  //   );
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  useEffect(() => reset(editMode ? { ...editValues } : { ...defaultValues }), [
    editMode,
    reset
  ]);

  const handleChange = () => setEditMode((editMode) => !editMode);

  const handleChangeVariant = (event: SelectChangeEvent) =>
    setVariant(event.target.value as Variant);

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    console.info("data", data);
  // alert(JSON.stringify(data));
  renderCount++;

  console.log(errors);

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Header
          renderCount={renderCount}
          description="isDirty works for all fields. Form returns data ready to sent. Focus is set on the first required field after validation."
        />
        <div className="container">
          <p>isDirty: {String(isDirty)} </p>
        </div>
        <div className="container">
          <p>dirtyFields: {JSON.stringify(dirtyFields)} </p>
        </div>
        <div className="container">
          <FormControlLabel
            control={<Switch checked={editMode} onChange={handleChange} />}
            label="Edit mode (Turn on to set values on fields)"
          />
        </div>

        <div className="container" style={{ paddingBottom: "1rem" }}>
          <Select value={variant} onChange={handleChangeVariant}>
            <MenuItem value="standard">Standard</MenuItem>
            <MenuItem value="outlined">Outlined</MenuItem>
          </Select>
        </div>

        <div className="container">
          <InputField
            control={control}
            name="firstName"
            label="Name"
            required
          />
        </div>
        <div className="container">
          <EmailField control={control} name="email" label="E-mail" required />
        </div>

        <div className="container">
          <PhoneNumberField
            control={control}
            name="phoneNumber"
            label="Mobile"
            required
          />
        </div>
        <div className="container">
          <PostalCodeField
            control={control}
            name="postalCode"
            label="Postal code"
            required
          />
        </div>
        <div className="container">
          <LabeledCheckbox
            control={control}
            name="isConfirm"
            label="Confirm"
            required
          />
        </div>

        <div className="container">
          <LabeledRadioGroup
            required
            label="Going?"
            control={control}
            name="going"
            options={goingOptions}
          />
        </div>

        <div className="container">
          <SelectField
            control={control}
            name="meal"
            label="Meal"
            options={mealOptions}
            required
          />
        </div>

        <div className="container">
          <AutocompleteField
            control={control}
            name="meal2"
            label="Meal autocomplete"
            options={mealOptions}
            required
          />
        </div>

        <div className="container">
          <CurrencyField
            control={control}
            name="currency"
            label="Currency"
            required
          />
        </div>

        <div className="container">
          <PercentField
            control={control}
            name="percent"
            label="Percent"
            required
          />
        </div>

        <div className="container">
          <DateField control={control} name="date" label="Date" required />
        </div>

        <div className="container">
          <DateTimeField
            control={control}
            name="datetime"
            label="Date & Time"
            required
          />
        </div>

        <div className="container">
          <TextareaField
            control={control}
            name="notes"
            label="Notes"
            required
          />
        </div>

        <div className="container">
          <LabeledSwitch control={control} name="switch" label="Tested" />
        </div>

        <ButtonsResult
          reset={reset}
          defaultValues={defaultValues}
          setEditMode={setEditMode}
        />
      </form>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
