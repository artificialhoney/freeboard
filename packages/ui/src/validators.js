export const validateRequired = (value) => {
  return value ? {} : { error: "This is required." };
};

export const validateInteger = (value) => {
  return value % 1 === 0 ? {} : { error: "Must be a whole number." };
};

export const validateNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value)
    ? {}
    : { error: "Must be a number." };
};
