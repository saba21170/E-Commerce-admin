import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import CreateButton from "./modal";

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
} from "react-bootstrap";

function TableList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
   //const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch products data from the API when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/products/getAllProducts?page=${currentPage}`
        );
        if (response.data.message === "SUCCESS") {
          //console.log(response.data);
          setProducts(response.data.data);
        } else {
          console.error("Failed to fetch products:", response.data.description);
        }
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, [currentPage]);

  // const handlePageChange = (newPage) => {
  //   setCurrentPage(newPage);
  // };
  

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
                  <CreateButton />
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
                      <th className="border-0">Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      
                      
                      <tr key={product.id}>
                        <td>{product._id}</td>
                        <td>{product.title}</td>
                        <td>{product.description}</td>
                        <td>{product.featured ? "Yes" : "No"}</td>
                        <td>{product.id}</td>
                        <td>{product.price}</td>
                        <td>
                          <img
                            src={product.images && product.images.length > 0 ? product.images[0] : ''}
                            
                            alt={`Product ${product._id} Image`}
                            style={{ width: "50px", height: "50px" }}
                          />
                          
                        </td>
                        
                      </tr>
                      
                    ))}
                  </tbody>
                  
                </Table>
              </Card.Body>
              {/* <Card.Footer>
                <Pagination>
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Item active>{currentPage}</Pagination.Item>
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </Card.Footer> */}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
