import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "./login.action";
import { validateForm } from "./validation";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const resetForm = () => {
    setData({
      email: "",
      password: "",
    });
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const message = useSelector((state) => state.failCategory.message);
  const {login} = useSelector((state) => state.adminLogin);
 
  
  useEffect(() => {
    if (login?.status) {
       history.push("/admin/dashboard");
    }
  }, [login]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateForm(data);
    setValidationErrors(error);

    if (!Object.values(error).some((err) => err)) {
      dispatch(loginAdmin(data));
      resetForm();
    }
  };
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

          {validationErrors?.email && (
            <div style={{ color: "red", marginTop: "5px" }}>
              {validationErrors.email}
            </div>
          )}
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

          {message?.emailError ? (
            <div style={{ color: "red", marginTop: "5px" }}>
              {message.emailError}
            </div>
          ) : (
            <div style={{ color: "red", marginTop: "5px" }}>
              {message?.passwordError}
            </div>
          )}

          {validationErrors?.password && (
            <div style={{ color: "red", marginTop: "5px" }}>
              {validationErrors?.password}
            </div>
          )}
          <Link to="/forget-password" className="forgot-password-link">
            Forgot Password?
          </Link>
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
