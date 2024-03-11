import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./categories.css";
import validator from "validator";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateForm } from "./validation";
import axios from "axios";

function CreateButton() {
  console.log("Rendering CreateButton");
  const [show, setShow] = useState(false);

  // State for storing input values
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
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
      name: "",
      description: "",
      status: formData.status,
      images: "",
      icon: "",
    });

    setImagePreview("");

    // Clear all validation errors
    setValidationErrors({});
  };

  // Function for storing file
const handleFileUpload = (e) => {
  const files = e.target.files;

  // Declare the errors variable
  let errors = {};

  // Check if files are selected
  if (files && files.length > 0) {
    const allowedExtensions = ["jpg", "jpeg", "png", "svg"];

    // Check each selected file
    const isValidFiles = Array.from(files).every((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();

      // Check if the file has a valid extension
      return allowedExtensions.includes(fileExtension);
    });

    if (!isValidFiles) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        images: "Only JPG, JPEG, PNG, and SVG formats are allowed",
      }));
      return; // Exit the function early if any file has an invalid extension
    }
  }

  setFormData((prevData) => ({
    ...prevData,
    images: files, // Send the array of selected files
    icon: files ? URL.createObjectURL(files[0]) : "", // Update icon based on the first file presence
  }));

  // setImagePreview
  setImagePreview(files ? URL.createObjectURL(files[0]) : "");

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
        await createProduct(); // Make the API call

        resetForm();
        handleClose();
      } catch (error) {
        // Log the error message 
        console.error("Error creating product:", error.message);
      }
    }
  };

  // Function for creating products
  const createProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/categories/",
        formData
      );
      console.log("Rendering createProduct");
      console.log(response.data); // Log the API response

      // Check if the response indicates success
      if (response.data.message === "SUCCESS") {
        // Add any additional logic if needed
      } else {
        console.error("Failed to create product:", response.data.description);
      }
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
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formId">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {validationErrors.name && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {validationErrors.name}
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
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Active"
                  name="status"
                  value="active"
                  checked={formData.status === "active"}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="radio"
                  label="Inactive"
                  name="status"
                  value="inactive"
                  checked={formData.status === "inactive"}
                  onChange={handleInputChange}
                />
              </div>
              {validationErrors.status && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {validationErrors.status}
                </div>
              )}
            </Form.Group>

            <Form.Group controlId="formId">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter Title"
                name="iamges"
                onChange={handleFileUpload}
              />
              {imagePreview && (
                <div style={{ marginTop: "10px" }}>
                  <img
                    className="image"
                    src={imagePreview}
                    alt="Image Preview"
                  />
                </div>
              )}
              {validationErrors.images && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {validationErrors.images}
                </div>
              )}
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
