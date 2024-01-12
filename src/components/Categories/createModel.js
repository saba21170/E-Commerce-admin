import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Select from "react-select";
import "./categories.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function CreateButton() {
  const [show, setShow] = useState(false);

  // State for storing input values
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    status:"",
    image: "",
    icon: "",
  });

  // New state for image preview
  const [imagePreview, setImagePreview] = useState("");
 
  // Reset function to clear all form fields
  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      description: "",
      status: false,
      category: "",
      price: "",
      image: "",
      icon: "",
    });

    setImagePreview("");
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
  };

  // Function to handle modal show
  const handleShow = () => setShow(true);

  // Function to handle modal close
  const handleClose = () => {
    resetForm();
    setShow(false);
  }

  // Function to handle form submission
  const handleSubmit = () => {
    resetForm(); 
    console.log(formData, "formData");
     handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create
      </Button>

      <Modal show={show} onHide={handleClose}  backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton >
          <Modal.Title>Add Product</Modal.Title>
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
                }}
              />
            </Form.Group>
            <Form.Group controlId="formFeatured">
              <Form.Label>Status</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  name="featured"
                  id="activeRadio"
                  value="active"
                  label="Active"
                  checked={formData.featured === "active"}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="radio"
                  name="featured"
                  id="inactiveRadio"
                  value="inactive"
                  label="Inactive"
                  checked={formData.featured === "inactive"}
                  onChange={handleInputChange}
                />
              </div>
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
