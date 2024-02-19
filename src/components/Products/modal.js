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

function CreateButton() {
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const { list } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    if (list) {
      setCategoriesList(list.data);
    }
  }, [list]);

  // State for storing input values
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    featured: "",
    category: "",
    price: "",
    images: null,
  });

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
    const file = e.target.files;

    // Declare the errors variable
    let errors = {};

    // Check if a file is selected
    if (file) {
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
        images: file,
      }));
    }
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      file: undefined,
    }));
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
  const handleShow = () => setShow(true);

  // Function to handle modal close
  const handleClose = () => {
    resetForm();
    setShow(false);
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
    setCurrentPage((prevData) => prevData + 1);
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
                name="category"
                onMenuScrollToBottom={onScroll}
                defaultValue={
                  categoriesList && categoriesList.length > 0
                    ? categoriesList.filter(
                        (category) => category._id === selectedCategory
                      )
                    : ""
                }
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
                name="Images"
                onChange={handleFileUpload}
                multiple
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
