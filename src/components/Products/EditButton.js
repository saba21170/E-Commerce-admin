import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { IoMdCreate } from "react-icons/io";
import "./product.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "bootstrap/dist/css/bootstrap.min.css";

const EditButton = ({ productId, onEdit }) => {
  const [showModal, setShowModal] = useState(false);

  // Add state for form fields
  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    description: "",
    featured: "",
    category: "",
    price: "",
    images: "",
  });

  const handleShow = () => {
    setCurrentProduct({
      title: currentProduct.title, // Set the initial value for title
      description: currentProduct.description,
      featured: currentProduct.featured,
      //category: currentProduct.category,
      price: currentProduct.price,
      //images: currentProduct.images,
    });
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const handleEdit = () => {

    // Ensure "featured" is set to false if it's an empty string
  const updatedProduct = {
    ...currentProduct,
    featured: currentProduct.featured === "" ? false : currentProduct.featured,
  };
    // Implement your edit logic here, e.g., make an API call
    console.log("Editing product with ID:", productId);
    console.log("New Data:", updatedProduct);

    onEdit(productId, updatedProduct);

    handleClose();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox separately
    const newValue = type === "checkbox" ? checked : value;
  
    // Set "featured" to false if the checkbox is not checked
    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : newValue,
    }));
  };
  return (
    <>
      <Button
        variant="link"
        size="sm"
        onClick={handleShow}
        className="edit-icon"
      >
        <IoMdCreate /> {/* Edit icon */}
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your form fields for editing product data here */}
          <Form>
            {/* Example field: */}
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={currentProduct.title}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <CKEditor
                editor={ClassicEditor}
                data={currentProduct.description}
                onChange={(event, editor) => {
                  const newData = editor.getData();
                  setCurrentProduct((prevProduct) => ({
                    ...prevProduct,
                    description: newData,
                  }));
                }}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={currentProduct.price}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    price: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formFeatured">
              <Form.Label></Form.Label>
              <Form.Check
                id="featuredCheckbox"
                type="checkbox"
                label="Featured"
                checked={currentProduct.featured}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default EditButton;
