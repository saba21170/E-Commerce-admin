// DeleteButton.js
import React, {useState} from "react";
import { Button } from "react-bootstrap";
import {  Modal, Form } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa';

const DeleteButton = ({ productId, onDelete }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleDelete = () => {
    // Implement your delete logic here, e.g., make an API call
    onDelete(productId);
    handleClose();
  };

  return (
    <>
      <FaTrash
        size={20}
        style={{ cursor: 'pointer', color: 'red' }}
        onClick={handleShow}
      />

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product?
        </Modal.Body>
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