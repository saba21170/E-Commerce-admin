import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import CreateButton from "./modal";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import Pagination from "rc-pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "./products.action";
import { getAllCategory } from "../Categories/category.action";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";

// react-bootstrap components
import {
  Badge,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";

function TableList() {
  let limit = 10;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modelType, setModelType] = useState(1);
  const [show, setShow] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  //const [totalPages, setTotalPages] = useState(1);

  // State for storing input values
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    featured: "",
    category: "",
    categoryId: "",
    price: "",
    images: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts(currentPage);
  }, []);

  useEffect(() => {
    dispatch(getAllProducts(currentPage));
  }, [currentPage]);

  const { listProducts } = useSelector((state) => state.product);

  useEffect(() => {
    if (listProducts) {
      setProducts(listProducts.data);
    }
  }, [listProducts]);

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const category = useSelector((state) => state.category);
  // console.log(category, "data from parent")

  useEffect(() => {
    if (category) {
      const data = category.list;
      setCategoriesList(data);
    }
  }, [category]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
                  Products List
                  <Button
                    variant="primary"
                    onClick={() => {
                      setModelType(1);
                      setShow(true);
                    }}
                    // onClick={handleShow}
                  >
                    Create
                  </Button>
                </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Id</th>
                      <th className="border-0">Title</th>
                      <th className="border-0">Description</th>
                      <th className="border-0">Featured</th>
                      <th className="border-0">Category</th>
                      <th className="border-0">Price</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products && products
                      ? products.map(
                          (product, index) => (
                            console.log(product, "product dataaaaaa"),
                            (
                              <tr key={product._id}>
                                <td>
                                  {(currentPage - 1) * limit + (index + 1)}
                                </td>
                                <td>{product.title}</td>
                                <td>
                                  {product.description ? (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: product.description,
                                      }}
                                    />
                                  ) : (
                                    "N/A"
                                  )}
                                </td>
                                <td>{product.featured ? "Yes" : "No"}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>
                                  <FaEye
                                    onClick={() => {
                                      setModelType(3);
                                      setShow(true);
                                      setFormData(product);
                                    }}
                                  />
                                  <FaEdit
                                    className="edit-icon"
                                    onClick={() => {
                                      setModelType(2);
                                      setFormData({
                                        ...product,
                                        id: product._id,
                                      });
                                      setShow(true);
                                    }}
                                  />
                                  <DeleteButton
                                    productId={product._id}
                                    currentPage={currentPage}
                                  />
                                </td>
                              </tr>
                            )
                          )
                        )
                      : ""}
                  </tbody>
                </Table>

                <Pagination
                  onChange={handlePageChange}
                  current={currentPage}
                  total={listProducts?.total}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <CreateButton
        modelType={modelType}
        showModel={show}
        setShowModel={setShow}
        formData={formData}
        setFormData={setFormData}
        categoriesList={categoriesList}
      />
    </>
  );
}

export default TableList;
