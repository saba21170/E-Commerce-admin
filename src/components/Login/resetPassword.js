import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {  useParams } from "react-router-dom";
import { resetPassword } from "./login.action";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"; 

const ResetPassword = ( ) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setPasswordsMatch(false);
        return;
      }
      const  resetData = {
        adminId:adminId,
        token:token,
        newPassword:password
      }
      dispatch(resetPassword(resetData)).then(() =>{
        history.push("/login");
      }).catch((error) => {
       console.error(error)
      });
      
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <Form>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
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
        variant="primary" 
        type="submit"
        onClick={handleSubmit}
        >
          Reset Password
        </Button>
      </Form>
    </div>
  );
};

export default ResetPassword;
