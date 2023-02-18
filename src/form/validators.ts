export const textFieldValidator = (isRequired?: boolean) => (value: string) => {
  if (!isRequired && !value) {
    return true;
  }
  //Check if not only spaces are entered
  return !!value.trim() || "Required";
};

export const postalCodeValidator = (isRequired?: boolean) => (
  value: string
) => {
  if (!isRequired && !value) {
    return true;
  }
  return /^[0-9]{2}-[0-9]{3}$/.test(value) || "Wrong postal code";
};

const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailValidator = (required?: boolean) => (value: string) => {
  if (!required && !value) {
    return true;
  }
  return emailRegexp.test(String(value).toLowerCase()) || "Wrong e-mail";
};

export const phoneNumberValidator = (isRequired?: boolean) => (
  value: string
) => {
  if (!isRequired && !value) {
    return true;
  }
  //min 9, max 11 digits, with optional +
  return /^\+?\d{9,11}$/.test(value) || "Mobile should have 9-11 digits";
};
