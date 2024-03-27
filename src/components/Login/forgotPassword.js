import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { passwordResetRequest } from "./login.action";
import { useDispatch } from "react-redux";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
const dispatch = useDispatch();
  const handleSubmit = (e) => {

    e.preventDefault();
    dispatch(passwordResetRequest(email)); 
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <Form >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Button 
        variant="primary" 
        type="submit"
        onClick={handleSubmit}
        >
          Send Email
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
