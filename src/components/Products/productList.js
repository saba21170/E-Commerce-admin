import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import CreateButton from "./modal";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

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

  const handleEdit = async (productId, updatedData) => {
    try {
      // Make the API call to update the product
      const response = await axios.patch(
        `http://localhost:3001/products/update/${productId}`,
        updatedData
      );

      // Check if the update was successful
      if (response.data.message === "SUCCESS") {
        console.log("Product updated successfully!");
        // Fetch the updated product list or update the state as needed
        const updatedProducts = await fetchUpdatedProducts();
        setProducts(updatedProducts);
      } else {
        console.error("Failed to update product:", response.data.description);

      }
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  const fetchUpdatedProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products/getAllProducts");

      if (response.data.message === "SUCCESS") {
        return response.data.data;
      } else {
        console.error("Failed to fetch updated products:", response.data.description);
        return [];
      }
    } catch (error) {
      console.error("Error fetching updated products:", error.message);
      return [];
    }
  };
  const handleDelete = async (productId) => {
    try {
      console.log("Deleting product with ID:", productId);
  
      const response = await axios.patch(`http://localhost:3001/products/delete/${productId}`);
      console.log("Delete response:", response.data);
  
      if (response.data.message === "Product deleted") {
        setProducts((prevProducts) => {
          console.log("Previous State:", prevProducts);
          const newProducts = prevProducts.filter((product) => product._id !== productId);
          console.log("New State:", newProducts);
          return newProducts;
        });
        console.log("Product deleted successfully");
      } else {
        console.error("Failed to delete product:", response.data.description);
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

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
                      <th className="border-0">Edit</th>
                      <th className="border-0">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map( (product, index) => (


                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>{product.title}</td>
                        <td>{product.description}</td>
                        <td>{product.featured ? "Yes" : "No"}</td>
                        <td>{product.category}</td>
                        <td>{product.price}</td>
                        {/* <td>
                          <img
                            src={product.images && product.images.length > 0 ? product.images[0] : ''}
                            
                            alt={`Product ${product._id} Image`}
                            style={{ width: "50px", height: "50px" }}
                          />
                           
                 
                          
                        </td> */}
                        <td>


                          <EditButton productId={product._id} onEdit={handleEdit} />{" "}


                        </td>
                        <td>
                          <DeleteButton productId={product._id} onDelete={handleDelete} />
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
