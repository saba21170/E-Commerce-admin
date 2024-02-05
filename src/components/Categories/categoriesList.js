import React, { useEffect, useState } from "react";
import CreateButton from "./createCategory";
import { useSelector, useDispatch } from "react-redux";
import {getAllCategory} from "./category.action";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function CategoriesList() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const [categoriesList, setCategoriesList] =useState([]);
  const {list} = useSelector((state) => state.category);



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
                    {Array.isArray(categoriesList) &&
                    list?.data.map((category, index)=> (
                      <tr key={category._id}>
                      <td>{index + 1}</td>
                      <td>{category.name}</td>
                      <td>{category.description}</td>
                      <td>{}</td>
                      <td>{}</td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CategoriesList;
