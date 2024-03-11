import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {loginAdmin} from "./login.action"
import "./login.css";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
const resetForm = () =>{
  setData({
    email: "",
    password: "",
  })
}
  const dispatch = useDispatch();



  //console.log(data, "from kkkkkkk");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(loginAdmin(data));
    resetForm();

    console.log(data,"i am data inside the submit")
  }


  return (
    <div className="form-container">
      <Form className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="form-label">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleInputChange}
            value={data.email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
            value={data.password}
          />
        </Form.Group>

        <Button 
        className="submit-button"
        variant="primary" 
        type="submit"
        onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
