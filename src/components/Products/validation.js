import validator from 'validator';

// Function to validate the form
export const validateForm = (formData,selectedCategory) => {
  const errors = {};

  // Validate each form field here
  if (!validator.isLength(formData.title, { min: 1 })) {
    errors.title = "Title is required";
  }

  if (!validator.isLength(formData.description, { min: 1 })) {
    errors.description = "Description is required";
  }

  if (!selectedCategory) {
    errors.category = "Category is required";
  }

  if (!validator.isNumeric(formData.price) || parseFloat(formData.price) <= 0) {
    errors.price = "Price must be a valid positive number";
  }
   // Validate the image field
  // Validate the image field
  if (!formData.images) {
    errors.images = "Image is required";
  }

  return errors;
};
