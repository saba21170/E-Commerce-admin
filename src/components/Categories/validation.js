import validator from 'validator';

// Function to validate the form
export const validateForm = (formData) => {
  const errors = {};

  // Validate each form field here
  if (!validator.isLength(formData.name, { min: 1 })) {
    errors.name = "Name is required";
  }

  if (!validator.isLength(formData.description, { min: 1 })) {
    errors.description = "Description is required";
  }

  
  if (!formData.images) {
    errors.images = "Image is required";
  }

  return errors;
};