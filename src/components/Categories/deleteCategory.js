// DeleteButton.js
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory, deleteCategory } from "./category.action";

const DeleteButton = ({ categoryId, currentPage }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteCategory(categoryId));
    dispatch(getAllCategory(currentPage));

    handleClose();
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
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
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
