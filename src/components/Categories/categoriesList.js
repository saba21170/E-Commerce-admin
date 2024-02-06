import React, { useEffect, useState } from "react";
import CreateButton from "./createCategory";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "./category.action";
import { ENV } from "../../config/config";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
// react-bootstrap components
import { Card, Table, Container, Row, Col, Modal } from "react-bootstrap";

function CategoriesList() {

  const limit = 10

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  //console.log(selectedImage ,"hjdfjfhjdhfjhdjfh")

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory(currentPage));
  }, []);

  const { list } = useSelector((state) => state.category);
  //console.log(list,"list");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    //console.log(image, "jhsdskjdksjdsk")
  };
  //console.log(selectedImage)
  const handleCloseModal = () => {
    setSelectedImage(null);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() =>{
    dispatch(getAllCategory(currentPage))
  },[currentPage])


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
                  <CreateButton />
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
                      <th className="border-0">Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list?.data.map(
                      (category, index) => (
                        console.log(category, "dsdsjdjjsdjsdjs"),
                        (
                          <tr key={category._id}>
                            <td>{((currentPage - 1) * limit + (index +1 ) )}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>{category.status}</td>
                            <td className="image-cell">
                              <img
                                src={`http://localhost:3002/static/${category.images[0]}`}
                                style={{ cursor: "pointer", maxWidth: "50px" }}
                                className="image-preview"
                                onClick={() =>
                                  handleImageClick(category.images[0])
                                }
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
