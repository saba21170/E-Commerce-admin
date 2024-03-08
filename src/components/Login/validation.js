
//import validator from 'validator';

export const validateForm = (formData, errorMessage) => {
  const errors = {};

  if (!formData.email.trim()) {
    errors.email = "Email address is required";
  }
  
  if (!formData.password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};
