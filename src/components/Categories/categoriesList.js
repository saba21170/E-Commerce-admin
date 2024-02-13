import React, { useEffect, useState } from "react";
import CreateButton from "./createCategory";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "./category.action";
import { ENV } from "../../config/config";
import Pagination from "rc-pagination";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";
import DeleteButton from "./deleteCategory";
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
  const [modelType, setModelType] = useState(1);

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesList, setCategoriesList] = useState();

  // State for storing input values
  const [modalData, setModalData] = useState({
    id: "",
    name: "",
    description: "",
    status: false,
    image: "",
  });

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
      setCategoriesList(list.data);
    }
  }, [list]);

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
                  <Button
                    variant="primary"
                    onClick={() => {
                      setShowModal(true);
                      setModelType(1);
                    }}
                  >
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
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriesList && categoriesList.length > 0
                      ? categoriesList.map((category, index) => (
                          <tr key={category._id}>
                            <td>{(currentPage - 1) * limit + (index + 1)}</td>
                            <td>{category.name}</td>
                            <td>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: category.description,
                                }}
                              />
                            </td>
                            <td>{category.status ? "Active" : "InActive"}</td>

                            <td>
                              <FaEye
                                onClick={() => {
                                  setShowModal(true);
                                  setModelType(2);
                                  setModalData({
                                    ...category,
                                    image: category.image,
                                  });
                                }}
                              />
                              <FaEdit
                                onClick={() => {
                                  setShowModal(true);
                                  setModelType(3);
                                  setModalData({
                                    ...category,
                                    image: category.image,
                                    id: category._id,
                                  });
                                }}
                                className="edit-icon"
                              />{" "}
                              {/* Edit icon */}
                              <DeleteButton
                                categoryId={category._id}
                                currentPage={currentPage}
                              />
                            </td>
                          </tr>
                        ))
                      : ""}
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
      <CreateButton
        showModal={showModal}
        setShowModal={setShowModal}
        modelType={modelType}
        modalData={modalData}
        currentPage={currentPage}
        setModalData={setModalData}
      />
    </>
  );
}

export default CategoriesList;
