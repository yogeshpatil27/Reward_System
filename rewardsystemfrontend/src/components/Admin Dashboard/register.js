import React, { useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ShowErrorMessage } from "../helper/helper";
import "./register.css";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Validator from "validator";
import isEmail from "validator/es/lib/isEmail";
import isEmpty from "validator/es/lib/isEmpty";
import Admin from "./admin";
import { isAuthenticated } from '../../Authen';

const Register = () => {
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().designation === "Admin") {
        console.log("I am a Admin");
        history.push('/Register')
      } else{
          history.push('/')
      }
}, [history])

  const [user, setUser] = useState({
    name: "",
    email: "",
    designation: "Manager",
    department: "Development",
    password: "",
    errormsg: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const close=()=>{
    history.push("/admin");
  }

  const register = (evt) => {

    evt.preventDefault();
    console.log(user);
    const { name, email, designation, department, password } = user;

    if (
      isEmpty(name) ||
      isEmpty(email) ||
      isEmpty(designation) ||
      isEmpty(department) ||
      isEmpty(password)
    ) {
      setUser({
        ...user,
        errormsg: "All fields are required",
      });
      alert("All fields are required");
    } else if (!isEmail(email)) {
      setUser({
        ...user,
        errormsg: "Invalid Email",
      });
      alert("Invalid Email");
    } else {
      const { name, email, designation, department, password } = user;

      axios.post("http://localhost:9009/employees", user).then((res) => {
        alert(res.data.message);
        // //            setLoginUser(res.data.user)
      });
      history.push("/admin");
    }
  };

  return (
    <div className="setup">
      <div>
        <p>{user.errormsg && ShowErrorMessage(user.errormsg)}</p>
      </div>

      <Container className="SetupForm">
        <Form>
          <Form.Group as={Row} className="mb-2" controlId="formPlaintextName">
            <Form.Label column sm="4">
              Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                name="name"
                type="text"
                value={user.name}
                onChange={handleChange}
                placeholder="Enter your Name"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              Email
            </Form.Label>
            <Col sm="8">
              <Form.Control
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter your Email"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm="4">Designation</Form.Label>
            <Col sm="8">
            <Form.Control
              as="select"
              name="designation"
              value={user.designation}
              onChange={handleChange}
            >
              <option defaultValue value="Manager">
                Manager
              </option>
              <option value="Team Lead">Team Lead</option>
              <option value="Employee">Employee</option>
            </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}  className="mb-2">
            <Form.Label column sm="4">Department</Form.Label>
            <Col sm="8">
            <Form.Control
              as="select"
              name="department"
              value={user.department}
              onChange={handleChange}
            >
              <option defaultValue value="Development">
                Development
              </option>
              <option value="Quality Assurance">Quality Assurance</option>
              <option value="Digital Assurance">Digital Assurance</option>
            </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="4">
              Password
            </Form.Label>
            <Col sm="8">
              <Form.Control
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter your Password"
              />
            </Col>
          </Form.Group>

          <div className="d-grid gap-2 mb-2">
            <Button size="lg" variant="outline-success" onClick={register}>
              Submit
            </Button>
          </div>
          <div className="d-grid gap-2 mb-2">
            <Button className="mb-2" size="lg" variant="outline-fail" onClick={close}>
             Close
            </Button>
          </div>
        </Form>
      </Container>

      {/* <div>
        <p>{JSON.stringify(user)}</p>
      </div> */}
    </div>
  );
};

export default Register;
