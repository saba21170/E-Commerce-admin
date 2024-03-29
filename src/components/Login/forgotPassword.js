import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { passwordResetRequest } from "./login.action";
import { useDispatch } from "react-redux";
import { toast , ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setValidationError("");
  };
const dispatch = useDispatch();
  const handleSubmit = async(e) => {

    e.preventDefault();
    if (!email) {
      setValidationError("Email is required.");
      return;
    }

    try {
      const response = await dispatch(passwordResetRequest(email));
      const emailResponse = response.status; 
      
      if (emailResponse) {
        toast.success("Password reset email sent successfully!");
      } else {
        toast.error("Failed to send password reset email.");
      }
    } catch (error) {
      toast.error("Failed to send password reset email.");
    }
  };

  return (
    <div className="form-container">
      <Form className="form">
      <h2 className="title">Forgot Password</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail" >
          <Form.Label className="form-label">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
          {validationError && (
            <div style={{ color: "red", marginTop: "5px" }}>
              {validationError}
            </div>
          )}
        </Form.Group>

        <Button 
          className="submit-button"
          variant="primary"
          type="submit"
        onClick={handleSubmit}
        >
          Send Email
        </Button>
        <ToastContainer className="toast-container"/>
      </Form>
    </div>
  );
};

export default ForgotPassword;
