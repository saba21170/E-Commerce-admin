import React, { useEffect, useState } from "react";
import CreateButton from "./createCategory";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "./category.action";
import { ENV } from "../../config/config";
import Pagination from "rc-pagination";
// import { IoMdCreate } from "react-icons/io";
// import { FaTrash } from 'react-icons/fa';
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";
import "rc-pagination/assets/index.css";
// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Modal,
  Button,
} from "react-bootstrap";

function CategoriesList() {
  const limit = 10;
  const [showModal, setShowModal] = useState(false);
  const [modelType ,setModelType ] = useState(1)

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesList, setCategoriesList] = useState()

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory(currentPage));
  }, []);

  const { list } = useSelector((state) => state.category);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    dispatch(getAllCategory(currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (list) {
      console.log(list, "list")
      setCategoriesList(list.data)
    }
  }, [list])


  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title
                  as="h4"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Category List
                  <Button variant="primary" onClick={()=>{setShowModal(true); setModelType(1) }}>
                    Create
                  </Button>

                </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Description</th>
                      <th className="border-0">Status</th>
                      {/* <th className="border-0">Image</th> */}
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriesList && categoriesList.map(
                      (category, index) => (
                        console.log(category, "dsdsjdjjsdjsdjs"),
                        (
                          <tr key={category._id}>
                            <td>{(currentPage - 1) * limit + (index + 1)}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>{category.status}</td>
                            {/* <td className="image-cell">
                              <img
                                src={`http://localhost:3002/static/${category.images[0]}`}
                                style={{ cursor: "pointer", maxWidth: "50px" }}
                                className="image-preview"
                                onClick={() =>
                                  handleImageClick(category.images[0])
                                }
                              />
                            </td> */}
                            <td>
                              <FaEye onClick={()=> {setShowModal(true); setModelType(2)}} />
                              <FaEdit onClick={()=> {setShowModal(true); setModelType(3)}}
                              className="edit-icon" /> {/* Edit icon */}
                              <FaTrash
                                size={20}
                                style={{ cursor: "pointer", color: "red" }}
                              />
                            </td>
                          </tr>
                        )
                      )
                    )}
                  </tbody>
                </Table>

                <Pagination
                  onChange={handlePageChange}
                  current={currentPage}
                  total={list?.totalPages}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <CreateButton showModal={showModal} setShowModal={setShowModal} modelType={modelType}/>

      <Modal show={!!selectedImage} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && (
            <img
              src={`http://localhost:3002/static/${selectedImage}`}
              alt="Preview"
              style={{ width: "100%" }}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CategoriesList;
