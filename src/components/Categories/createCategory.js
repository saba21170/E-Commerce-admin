import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./categories.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { createCategory } from "../Categories/category.action";

function CreateButton({ showModal,setShowModal,modelType,modalData,setModalData }) {

  

  console.log("this is my categoryList",modalData)

  const dispatch = useDispatch();

  // New state for image preview
  // const [imagePreview, setImagePreview] = useState("");

  // Reset function to clear all form fields
  const resetForm = () => {
    setModalData({
      name: "",
      description: "",
      status: modalData.status,
    });

    // setImagePreview("");
  };

  // Function for storing file
  // const handleFileUpload = (e) => {
  //   const files = e.target.files;

  //   setModalData((prevData) => ({
  //     ...prevData,
  //     images: files, // Send the array of selected files
  //     icon: files ? URL.createObjectURL(files[0]) : "", // Update icon based on the first file presence
  //   }));

  // setImagePreview
  // setImagePreview(files ? URL.createObjectURL(files[0]) : "");

  // Clear validation error for the image field
  //   setValidationErrors((prevErrors) => ({
  //     ...prevErrors,
  //     images: undefined,
  //   }));
  // };
  // Function to handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevmodalData) => ({
      ...prevmodalData,
      [name]: value,
    }));
  };
//console.log(modalData)
  // Function to handle modal show
  // const handleShow = () => setShow(true);

  // // Function to handle modal close
  const handleClose = () => {
    resetForm();
    setShowModal(false);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const newData = {
      name:modalData.name,
      description:modalData.description,
      status:modalData.status
    };
    console.log(newData);


    dispatch(createCategory(newData));
  };

  return (
    <>

      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modelType === 1 ? "Create" : modelType === 2 ? "View" : "Edit" }
            
             Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formId">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                disabled = {modelType === 2}
                
                value={modalData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formId">
              <Form.Label>Description</Form.Label>
              <CKEditor
                editor={ClassicEditor}
                disabled={modelType===2}
                data={modalData.description} // Pass the initial data from the state
                onChange={(event, editor) => {
                  const newData = editor.getData();
                  setModalData((prevData) => ({
                    ...prevData,
                    description: newData,
                  }));
                }}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Active"
                  name="status"
                  value="active"
                  disabled = {modelType === 2}
                  checked={modalData.status === "active"}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="radio"
                  label="Inactive"
                  name="status"
                  value="inactive"
                  disabled = {modelType === 2}
                  checked={modalData.status === "inactive"}
                  onChange={handleInputChange}
                />
              </div>
            </Form.Group>
            {/* 
            <Form.Group controlId="formId">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
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
            </Form.Group> */}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          {modelType === 1 ? <Button
            variant="primary"
            onClick={handleSubmit}
            style={{ marginLeft: "auto" }}
          >
            Create
          </Button> : ""}
          
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateButton;
