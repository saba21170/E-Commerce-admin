import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./categories.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { validateForm } from "./validation";
import { clearError } from "../../redux/reduxError/failed.action";
import {
  createCategory,
  getAllCategory,
  updateCategory,
} from "../Categories/category.action";
import { ENV } from "../../config/config";

function CreateButton({
  showModal,
  setShowModal,
  modelType,
  modalData,
  setModalData,
  currentPage,
}) {
  const dispatch = useDispatch();

  // New state for image preview
  const [imagePreview, setImagePreview] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  // Reset function to clear all form fields
  const resetForm = () => {
    setModalData({
      name: "",
      description: "",
      status: "",
      image: "",
    });
    setImagePreview("");

    setValidationErrors({});
  };
  const errorMessage = useSelector((state) => state.failCategory.message);

  // Function for storing file
  const handleFileUpload = (e) => {
    const files = e.target.files[0];
    setModalData((prevData) => ({
      ...prevData,
      image: files,
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      files: undefined,
    }));

    //setImagePreview
    setImagePreview(files ? URL.createObjectURL(files) : "");
  };
  // Function to handle changes in input fields

  const handleStatusChange = (event) => {
    const { name, value } = event.target;

    const newValue = value === "active" ? 1 : 0;

    setModalData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevmodalData) => ({
      ...prevmodalData,
      [name]: value,
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };
  // Function to handle modal close
  const handleClose = () => {
    dispatch(clearError());
    resetForm();
    setShowModal(false);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const errors = validateForm(modalData);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      const productFormData = new FormData();

      productFormData.append("name", modalData.name);
      productFormData.append("description", modalData.description);
      productFormData.append("status", modalData.status);
      productFormData.append("image", modalData.image);

      if (modelType === 3) {
        productFormData.append("id", modalData.id);
      }

      {
        modelType === 1
          ? dispatch(createCategory(productFormData))
              .then(() => {
                dispatch(getAllCategory(currentPage));
                // setShowModal(false);

                // resetForm();
              })
              .catch(() => console.log("Something went wrong!"))
          : dispatch(updateCategory(productFormData, modalData.id))
              .then(() => {
                dispatch(getAllCategory(currentPage));
                setShowModal(false);
                resetForm();
              })
              .catch(() => console.log("Something went wrong!"));
      }
    }
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
            {modelType === 1 ? "Create" : modelType === 2 ? "View" : "Edit"}{" "}
            Category
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formId">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                disabled={modelType === 2}
                value={modalData.name}
                onChange={handleInputChange}
              />
              {errorMessage && !errorMessage.status && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {errorMessage.message}
                </div>
              )}
              {validationErrors?.name && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {validationErrors?.name}
                </div>
              )}
            </Form.Group>
            <Form.Group controlId="formId">
              <Form.Label>Description</Form.Label>
              <CKEditor
                editor={ClassicEditor}
                disabled={modelType === 2}
                data={modalData.description}
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
                  disabled={modelType === 2}
                  checked={modalData.status}
                  onChange={handleStatusChange}
                />
                <Form.Check
                  type="radio"
                  label="Inactive"
                  name="status"
                  value="inactive"
                  disabled={modelType === 2}
                  checked={!modalData.status}
                  onChange={handleStatusChange}
                />
              </div>
            </Form.Group>

            {modelType !== 2 && (
              <Form.Group controlId="formId">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleFileUpload}
                />
                {validationErrors?.image && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {validationErrors?.image}
                  </div>
                )}

                {modelType === 1 && imagePreview && (
                  <div style={{ marginTop: "10px" }}>
                    <img
                      className="image"
                      src={imagePreview}
                      alt="Image Preview"
                    />
                  </div>
                )}
              </Form.Group>
            )}

            {modelType !== 1 && modalData.image && (
              <Form.Group controlId="formId">
                <Form.Label>Image</Form.Label>
                <div style={{ marginTop: "10px" }}>
                  {modelType === 3 && imagePreview ? (
                    <div style={{ marginTop: "10px" }}>
                      <img
                        className="image"
                        src={imagePreview}
                        alt="Image Preview"
                      />
                    </div>
                  ) : (
                    <img
                      className="image"
                      src={`${ENV.imageURL}/${modalData.image}`}
                      alt="Image"
                    />
                  )}
                </div>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {modelType !== 2 ? (
            <Button
              variant="primary"
              onClick={handleSubmit}
              style={{ marginLeft: "auto" }}
            >
              {modelType === 1 ? "Create" : "Edit"}
            </Button>
          ) : (
            ""
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateButton;
