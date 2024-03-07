
import validator from 'validator';

export const validateForm = (formData, errorMessage) => {
  const errors = {};

  if (!validator.isEmail(formData.email)) {
    errors.email = " Email address is required";
  }

  if (!validator.isLength(formData.password, { min: 4 })) {
    errors.password = "Password is required";
  }

  if (errorMessage && !errorMessage.status) {
    errors.general = errorMessage.message;
  }

  return errors;
};
