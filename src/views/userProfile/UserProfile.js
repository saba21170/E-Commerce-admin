import React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getData, updateAdmin } from "../../components/Login/login.action";
import { ENV } from "../../config/config";

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

function User() {
  const [editData, setEditData] = useState({
    company: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    aboutMe: "",
    profileImage:"",
    coverImage:""
  });
  const adminId = ENV.decryptAdmin();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData(adminId));
  }, []);

  const { get } = useSelector((state) => state.adminLogin);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };
  const profileImageInputRef = useRef(null);
  const coverImageInputRef = useRef(null);

  const handleProfileImageClick = () => {
    profileImageInputRef.current.click();
  };
  const handleCoverImageClick = () => {
    coverImageInputRef.current.click();
  };
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setEditData({
      ...editData,
      profileImage: file,
    });
  };
  
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setEditData((prevData) => ({
      ...prevData,
      coverImage: file,
    }))
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileFormData = new FormData();

    profileFormData.append("company", editData.company);
    profileFormData.append("username", editData.username);
    profileFormData.append("email", editData.email);
    profileFormData.append("firstName", editData.firstName);
    profileFormData.append("lastName", editData.lastName);
    profileFormData.append("address", editData.address);
    profileFormData.append("city", editData.city);
    profileFormData.append("country", editData.country);
    profileFormData.append("postalCode", editData.postalCode);
    profileFormData.append("aboutMe", editData.aboutMe);
    profileFormData.append("profileImage", editData.profileImage);
    profileFormData.append("coverImage", editData.coverImage);
    
    dispatch(updateAdmin(adminId, profileFormData))
      .then(() => {
        console.log("upadated successfuly");
      })
      .catch(() => console.log("Something went wrong!"));
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Company</label>
                        <Form.Control
                          name="company"
                          value={editData.company}
                          placeholder="Company"
                          type="text"
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          //defaultValue={get?.data.userName}
                          name="username"
                          value={editData.username}
                          placeholder="User Name"
                          type="text"
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          defaultValue={get?.data.email}
                          name="email"
                          value={editData.email}
                          placeholder="Email"
                          type="text"
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          name="firstName"
                          value={editData.firstName}
                          placeholder="First Name"
                          type="text"
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          name="lastName"
                          value={editData.lastName}
                          placeholder="Last Name"
                          type="text"
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          name="address"
                          value={editData.address}
                          placeholder="Address"
                          type="text"
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          name="city"
                          value={editData.city}
                          placeholder="City"
                          type="text"
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Country</label>
                        <Form.Control
                          name="country"
                          value={editData.country}
                          placeholder="Country"
                          type="text"
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Postal Code</label>
                        <Form.Control
                          name="postalCode"
                          value={editData.postalCode}
                          placeholder="Postal Code"
                          type="number"
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        <Form.Control
                          cols="80"
                          name="aboutMe"
                          value={editData.aboutMe}
                          onChange={handleInputChange}
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={handleSubmit}
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                {/* cover photo */}
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                  onClick={handleCoverImageClick}
                ></img>
                <input
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={coverImageInputRef}
                  onChange={handleCoverImageChange}
                />
              </div>
              <Card.Body>
                <div className="author">
                  {/* profile photo */}
                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={require("assets/img/faces/face-3.jpg")}
                    onClick={handleProfileImageClick}
                  ></img>
                  <input
                    type="file"
                    name= "profileImage"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={profileImageInputRef}
                    onChange={handleProfileImageChange}
                  />
                  <h5 className="title">Mike Andrew</h5>

                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  // onClick={handleSubmit}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
