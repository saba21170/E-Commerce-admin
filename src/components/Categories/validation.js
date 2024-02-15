import validator from "validator";

// Function to validate the form
export const validateForm = (modalData) => {
  const errors = {};

  // Validate each form field here
  if (!validator.isLength(modalData.name, { min: 1 })) {
    errors.name = "Name is required";
  }

  if (!modalData.image) {
    
    errors.image = "Image is required";
  }

  return errors;
};
