import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Select from "react-select";
import "./product.css";
import validator from "validator";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateForm } from "./validation";

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
    image: "",
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
      category: "",
      price: "",
      image: "",
      icon: "",
    });

    setImagePreview("");

     // Clear all validation errors
    setValidationErrors({});
  };

  const options = [
    { value: "category1", label: "Category 1" },
    { value: "category2", label: "Category 2" },
    { value: "category3", label: "Category 3" },
    // Add more options as needed
  ];

  const handleCategoryChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      category: selectedOption ? selectedOption.value : "",
    }));
    // Clear validation error for the category field
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      category: undefined,
    }));
  };

  //Function for storing file
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
      icon: URL.createObjectURL(file),
    }));

    //setImagePreview
    setImagePreview(URL.createObjectURL(file));

    // Clear validation error for the image field
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      image: undefined,
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(formData, "formData");
      resetForm();
      handleClose();
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

            <Form.Group controlId="formCategory">
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
            </Form.Group>
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
              {validationErrors.image && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {validationErrors.image}
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
