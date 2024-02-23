// DeleteButton.js
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteProduct, getAllProducts } from "./products.action";

const DeleteButton = ({ productId, currentPage }) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleDelete = () => {
    dispatch(deleteProduct(productId))
      .then(() => {
        dispatch(getAllProducts(currentPage));
        
      })
      .catch(() => console.log("something went wrong!"));
  };

  return (
    <>
      <FaTrash
        size={20}
        style={{ cursor: "pointer", color: "red" }}
        onClick={handleShow}
      />

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteButton;
