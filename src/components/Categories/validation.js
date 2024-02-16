import validator from 'validator';

export const validateForm = (modalData, errorMessage) => {
  const errors = {};



  // Validate each form field here

  if (!validator.isLength(modalData && modalData.name, { min: 1 })) {
    errors.name = "Name is required";
  } else {
   
    if (errorMessage && !errorMessage.status) {
      errors.name = errorMessage.message;
    }
  }

  if (!modalData.image) {
    errors.image = "Image is required";
  }

 // console.log(errors, "ERROR!!! object")


  return errors;
};
