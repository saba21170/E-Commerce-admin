import validator from 'validator';

// Function to validate the form
export const validateForm = (formData) => {
  const errors = {};

  // Validate each form field here
  if (!validator.isLength(formData.title, { min: 1 })) {
    errors.title = "Title is required";
  }

  if (!validator.isLength(formData.description, { min: 1 })) {
    errors.description = "Description is required";
  }

  if (!formData.category) {
    errors.category = "Category is required";
  }

  if (!validator.isNumeric(formData.price) || parseFloat(formData.price) <= 0) {
    errors.price = "Price must be a valid positive number";
  }
   // Validate the image field
   if (!formData.image) {
    errors.image = "Image is required";
  } else {
    const allowedExtensions = ["jpg", "jpeg", "png", "svg"];
    const fileExtension = formData.image.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      errors.image = "Only JPG, JPEG, PNG, and SVG formats are allowed";
    }
  }

  return errors;
};