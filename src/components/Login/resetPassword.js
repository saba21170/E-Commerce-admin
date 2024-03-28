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
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
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
        }, 50000);
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
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {!passwordsMatch && (
            <Form.Text className="text-danger">
              Passwords do not match
            </Form.Text>
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
