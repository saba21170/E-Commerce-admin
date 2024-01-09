import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css';

function Login() {
  return (
    <div className="form-container">
      <Form className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="form-label">Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button className="submit-button" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;