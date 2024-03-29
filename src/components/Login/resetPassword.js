import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { resetPassword } from "./login.action";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const ResetPassword = () => {
  const { adminId, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      password: "",
    }));
     
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: "",
    }));
  };

  const validatePassword = () => {
    const errors = {};
    if (!password) {
      errors.password = "Password field is required.";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password field is required.";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
     
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validatePassword();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    const resetData = {
      adminId: adminId,
      token: token,
      newPassword: password,
    };
    try {
      const response = await dispatch(resetPassword(resetData));
      const data = response.status;

      if (data) {
        toast.success("Password reset successfully!");
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      } else {
        toast.error("Failed to reset password.");
      }
    } catch (error) {
      toast.error("Failed to reset password.");
    }
  };

  return (
    <div className="form-container">
      <Form className="form">
        <h2 className="title">Reset Password</h2>
        <Form.Group controlId="formBasicPassword" className="mb-3">
          <Form.Label className="form-label">New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={handlePasswordChange}
          />
          {validationErrors.password && (
            <div style={{ color: "red", marginTop: "5px" }}>
              {validationErrors.password}
            </div>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {validationErrors.confirmPassword && (
            <div style={{ color: "red", marginTop: "5px" }}>
              {validationErrors.confirmPassword}
            </div>
          )}
        </Form.Group>

        <Button
          className="submit-button"
          variant="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Reset Password
        </Button>
        <ToastContainer className="toast-container" />
      </Form>
    </div>
  );
};

export default ResetPassword;
