import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Select from "react-select";
import "./product.css";
import validator from "validator";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateForm } from "./validation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  getAllProducts,
  updateProduct,
} from "./products.action";
import { getAllCategory } from "../Categories/category.action";
import { ENV } from "../../config/config";

function CreateButton({
  modelType,
  showModel,
  setShowModel,
  formData,
  setFormData,
  categoriesList,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const categoryListArray = categoriesList?.data;
  const categoryOptions = categoryListArray?.map((category) => ({
    label: category.name,
    value: category._id,
  }));

  const [validationErrors, setValidationErrors] = useState({});

  const [imagePreview, setImagePreview] = useState("");

  // Reset function to clear all form fields
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      featured: false,
      category: "",
      price: "",
      images: null,
    });

    setImagePreview("");

    // Clear all validation errors
    setValidationErrors({});
  };

  //Function for storing file
  const handleFileUpload = (e) => {
    const files = e.target.files;

    // Declare the errors variable
    let errors = {};

    // Check if a file is selected
    if (files && files.length > 0) {
      // const allowedExtensions = ["jpg", "jpeg", "png", "svg"];
      // const fileExtension = file.name.split(".").pop().toLowerCase();

      // Check if the selected file has a valid extension
      // if (!allowedExtensions.includes(fileExtension)) {
      //   setValidationErrors((prevErrors) => ({
      //     ...prevErrors,
      //     images: "Only JPG, JPEG, PNG, and SVG formats are allowed",
      //   }));
      //   return; // Exit the function early if the extension is not allowed
      // }
      //Update formData using a callback
      setFormData((prevData) => ({
        ...prevData,
        images: files,
      }));
    }
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      file: undefined,
    }));

    //setImagePreview
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "category" && selectedCategory) {
      setFormData((prevData) => ({
        ...prevData,
        category: selectedCategory.value,
      }));
    } else {
      const newValue = type === "checkbox" ? checked : value;
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    }
    // Clear validation error for the corresponding field
    // setValidationErrors((prevErrors) => ({
    //   ...prevErrors,
    //   [name]: undefined,
    // }));
  };

  // Function to handle modal show
  // const handleShow = () => setShow(true);

  // Function to handle modal close
  const handleClose = () => {
    resetForm();
    setShowModel(false);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const { images } = formData;

    const productFormData = new FormData();

    for (let index = 0; index < images.length; index++) {
      productFormData.append("images", images[index]);
    }
    productFormData.append("title", formData.title);
    productFormData.append("description", formData.description);
    productFormData.append("price", formData.price);
    productFormData.append("featured", formData.featured);
    productFormData.append("category", formData.categoryId);

    {
      modelType === 1
        ? dispatch(createProduct(productFormData))
            .then(() => {
              dispatch(getAllProducts(currentPage));
              handleClose();
            })
            .catch(() => console.log("Something went wrong!"))
        : dispatch(updateProduct(productFormData, formData.id))
            .then(() => {
              dispatch(getAllProducts(currentPage));
              handleClose();
            })
            .catch(() => console.log("Something went wrong to update!"));
    }
  };

  useEffect(() => {
    dispatch(getAllCategory(currentPage));
  }, [currentPage]);

  const onScroll = () => {
    if (categoriesList.totalPages !== categoriesList.length) {
      setCurrentPage((prevData) => prevData + 1);
    }
  };

  return (
    <>
      <Modal
        show={showModel}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modelType === 1 ? "Create" : modelType === 2 ? "Edit" : "View"}{" "}
            Product
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formId">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                name="title"
                disabled={modelType === 3}
                value={formData.title}
                onChange={handleInputChange}
              />
              {/* {validationErrors.title && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {validationErrors.title}
                </div>
              )} */}
            </Form.Group>
            <Form.Group controlId="formId">
              <Form.Label>Description</Form.Label>
              <CKEditor
                editor={ClassicEditor}
                data={formData.description}
                disabled={modelType === 3}
                onChange={(event, editor) => {
                  const newData = editor.getData();
                  setFormData((prevData) => ({
                    ...prevData,
                    description: newData,
                  }));
                  setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    description: undefined,
                  }));
                }}
              />
              {/* {validationErrors.description && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {validationErrors.description}
                </div>
              )} */}
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Select
                options={categoryOptions}
                onMenuScrollToBottom={onScroll}
                name="category"
                placeholder="Select"
                isDisabled={modelType === 3}
                onChange={(selectedOption) =>
                  setFormData({ ...formData, categoryId: selectedOption.value })
                }
                defaultValue={categoryOptions?.filter(
                  (category) => category.value === formData.categoryId
                )}
              />

              {/* {validationErrors.category && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {validationErrors.category}
                </div>
              )} */}
            </Form.Group>
            <Form.Group controlId="formId">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                name="price"
                disabled={modelType === 3}
                value={formData.price}
                onChange={handleInputChange}
              />
              {validationErrors.price && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {validationErrors.price}
                </div>
              )}
            </Form.Group>

            {modelType !== 3 && (
              <Form.Group controlId="formId">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="images"
                  onChange={handleFileUpload}
                  multiple
                />

                {modelType === 1 && imagePreview
                  ? imagePreview.map((preview, index) => (
                      <div key={index} style={{ marginTop: "10px" }}>
                        <img
                          className="image"
                          src={preview}
                          alt={`Preview ${index}`}
                        />
                      </div>
                    ))
                  : ""}
              </Form.Group>
            )}

            <Form.Group controlId="formFeatured">
              <Form.Label></Form.Label>
              <Form.Check
                type="checkbox"
                label="Featured"
                disabled={modelType === 3}
                name="featured"
                checked={formData.featured}
                id="featuredCheckbox"
                onChange={handleInputChange}
              />
            </Form.Group>

            {modelType !== 1 && formData.images && (
              <Form.Group controlId="formId">
                <Form.Label>Images</Form.Label>
                <div style={{ marginTop: "10px" }}>
                  {modelType === 2 && imagePreview
                    ? imagePreview.map((preview, index) => (
                        <div key={index} style={{ marginTop: "10px" }}>
                          <img
                            className="image"
                            src={preview}
                            alt={`Preview ${index}`}
                          />
                        </div>
                      ))
                    : formData.images.map((image, index) => (
                        <div style={{ marginTop: "10px" }}>
                          <img
                            className="image"
                            src={`${ENV.imageURL}/${image}`}
                            alt="Image"
                          />
                        </div>
                      ))}
                </div>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          {modelType !== 3 ? (
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

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default CreateButton;
