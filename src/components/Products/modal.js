import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Select from "react-select";
import "./product.css";
import validator from "validator";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateForm } from "./validation";
import axios from "axios";

function CreateButton() {
  const [show, setShow] = useState(false);

  // State for storing input values
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    featured: "",
    category: "",
    price: "",
    images: "",
    icon: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  // New state for image preview
  const [imagePreview, setImagePreview] = useState("");

  // Reset function to clear all form fields
  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      featured: false,

      price: "",
      images: "",
      icon: "",
    });

    setImagePreview("");

    // Clear all validation errors
    setValidationErrors({});
  };

  // const options = [
  //   { value: "category1", label: "Category 1" },
  //   { value: "category2", label: "Category 2" },
  //   { value: "category3", label: "Category 3" },
  //   // Add more options as needed
  // ];

  // const handleCategoryChange = (selectedOption) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     category: selectedOption ? selectedOption.value : "",
  //   }));
  //   // Clear validation error for the category field
  //   setValidationErrors((prevErrors) => ({
  //     ...prevErrors,
  //     category: undefined,
  //   }));
  // };

  //Function for storing file
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];

    // Declare the errors variable
    let errors = {};

    // Check if a file is selected
    if (file) {
      const allowedExtensions = ["jpg", "jpeg", "png", "svg"];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      // Check if the selected file has a valid extension
      if (!allowedExtensions.includes(fileExtension)) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          images: "Only JPG, JPEG, PNG, and SVG formats are allowed",
        }));
        return; // Exit the function early if the extension is not allowed
      }
      if (!formData.images) {
        errors.images = "Image is required";
      } else {
        const allowedExtensions = ["jpg", "jpeg", "png", "svg"];
        const fileExtension = formData.images.name
          .split(".")
          .pop()
          .toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          errors.images = "Only JPG, JPEG, PNG, and SVG formats are allowed";
        }
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      images: file,
      icon: URL.createObjectURL(file),
    }));

    //setImagePreview
    setImagePreview(URL.createObjectURL(file));

    // Clear validation error for the image field
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      images: undefined,
    }));
  };

  // Function to handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle checkbox separately
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear validation error for the corresponding field
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  // Function to handle modal show
  const handleShow = () => setShow(true);

  // Function to handle modal close
  const handleClose = () => {
    resetForm();
    setShow(false);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        // Set a loading state if needed
        // setLoading(true);

        await createProduct(); // Make the API call

        // Reset loading state if needed
        // setLoading(false);

        resetForm();
        handleClose();
      } catch (error) {
        // Log the error message or display it to the user
        console.error("Error creating product:", error.message);
      }
    }
  };

  // Function for creating products
  const createProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/products/add",
        formData
      );
      console.log(response.data); // Log the API response
    } catch (error) {
      // Log the error message or display it to the user
      console.error("Error creating product:", error.message);
      throw error; // Re-throw the error to be caught in the handleSubmit function
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formId">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
              {validationErrors.title && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {validationErrors.title}
                </div>
              )}
            </Form.Group>
            <Form.Group controlId="formId">
              <Form.Label>Description</Form.Label>
              <CKEditor
                editor={ClassicEditor}
                data={formData.description} // Pass the initial data from the state
                onChange={(event, editor) => {
                  const newData = editor.getData();
                  setFormData((prevData) => ({
                    ...prevData,
                    description: newData,
                  }));
                  // Clear validation error for the description field
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    description: undefined,
                  }));
                }}
              />
              {validationErrors.description && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {validationErrors.description}
                </div>
              )}
            </Form.Group>

            {/* <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Select
                value={options.find(
                  (option) => option.value === formData.category
                )}
                onChange={handleCategoryChange}
                options={options}
              />
              {validationErrors.category && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {validationErrors.category}
                </div>
              )}
            </Form.Group> */}
            <Form.Group controlId="formId">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
              {validationErrors.price && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {validationErrors.price}
                </div>
              )}
            </Form.Group>

            <Form.Group controlId="formId">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter Title"
                name="iamge"
                onChange={handleFileUpload}
              />
              {imagePreview && (
                <div style={{ marginTop: "10px" }}>
                  <img class="image" src={imagePreview} alt="Image Preview" />
                </div>
              )}
              {validationErrors.images && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {validationErrors.images}
                </div>
              )}
            </Form.Group>
            <Form.Group controlId="formFeatured">
              <Form.Label></Form.Label>
              <Form.Check
                type="checkbox"
                label="Featured"
                name="featured"
                id="featuredCheckbox"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleSubmit}
            style={{ marginLeft: "auto" }}
          >
            Create
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default CreateButton;
