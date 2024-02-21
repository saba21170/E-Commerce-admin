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
import { createProduct, getAllProducts } from "./products.action";
import { getAllCategory } from "../Categories/category.action";
import { ENV } from "../../config/config"

function CreateButton({
  modelType,
  showModel,
  setShowModel,
  formData,
  setFormData,
}) {
  console.log(formData,"formdataaaaa")
  const [selectedCategory, setSelectedCategory] = useState();
  const [categoriesList, setCategoriesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllCategory());
  // }, []);

  const { list } = useSelector((state) => state.category);

  useEffect(() => {
    // dispatch(getAllProducts());
    dispatch(getAllCategory());
  }, []);

  // const { products } = useSelector((state) => state.product);

  useEffect(() => {
    if (list) {
      const data = list.data;
      // setCategoriesList((prevData) => [...prevData, ...data]);
      setCategoriesList(data);
    }
  }, [list]);

  const [validationErrors, setValidationErrors] = useState({});

  // New state for image preview
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
    productFormData.append("category", selectedCategory);

    dispatch(createProduct(productFormData));
    handleClose();
  };

  const handleCat = (option) => {
    setSelectedCategory(option.value);
  };

  useEffect(() => {
    dispatch(getAllCategory(currentPage));
  }, [currentPage]);

  const onScroll = () => {
    if (list.totalPages !== categoriesList.length) {
      setCurrentPage((prevData) => prevData + 1);
    }
  };
  console.log(formData, "formData formData");
  console.log(categoriesList, "categoriesList categoriesList");

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
              {/* {validationErrors.description && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {validationErrors.description}
                </div>
              )} */}
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Select
                name="category"
                placeholder="Select"
                onMenuScrollToBottom={onScroll}
                defaultValue={categoriesList.filter(
                  (category) => category._id === formData.categoryId
                )}
                onChange={(selectedOption) => handleCat(selectedOption)}
                options={
                  categoriesList && categoriesList.length > 0
                    ? categoriesList.map((category) => ({
                        value: category._id,
                        label: category.name,
                      }))
                    : ""
                }
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
                name="Images"
                onChange={handleFileUpload}
                multiple
              />
              {/* {imagePreview && (
                <div style={{ marginTop: "10px" }}>
                  <img
                    className="image"
                    src={imagePreview}
                    alt="Image Preview"
                  />
                </div>
              )} */}
              <div>
                {/* Render image previews using map */}
                {imagePreview && imagePreview
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
              </div>
              {/* {validationErrors.images && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {validationErrors.images}
                </div>
              )} */}
            </Form.Group>
            <Form.Group controlId="formFeatured">
              <Form.Label></Form.Label>
              <Form.Check
                type="checkbox"
                label="Featured"
                name="featured"
                checked={formData.featured}
                id="featuredCheckbox"
                onChange={handleInputChange}
              />
            </Form.Group>

            {modelType === 3 && formData.images && (
              <Form.Group controlId="formId">
                <Form.Label>Image</Form.Label>
                <div style={{ marginTop: "10px" }}>
                  <img
                    className="image"
                    src={`${ENV.imageURL}/${formData.images}`}
                    alt="Image"
                  />
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
