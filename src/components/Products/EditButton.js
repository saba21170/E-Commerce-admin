import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { IoMdCreate } from "react-icons/io";
import "./product.css";


const EditButton = ({ productId, onEdit }) => {
  const [showModal, setShowModal] = useState(false);

  // Add state for form fields
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    title: "",
    description: "",
    featured: "",
    category: "",
    price: "",
    images: "",
    icon: "",

  });

  const handleShow = () => {

    setCurrentProduct({
        title: currentProduct.title,  // Set the initial value for title
      });
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false) ;
   
  const handleEdit = () => {
    // Implement your edit logic here, e.g., make an API call
    console.log("Editing product with ID:", productId);
    console.log("New Data:", currentProduct);

    onEdit(productId,currentProduct);
     
    handleClose();
  };
  return (
    <>
        <Button variant="link" size="sm" onClick={handleShow} className="edit-icon">
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
              <Form.Control type="text" placeholder="Enter title"
              value={currentProduct.title}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, title: e.target.value })
              }
               />
            </Form.Group>
            {/* Add more fields as needed */}
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