import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Card, Row, Toast, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import employeeService from "../services/employee.service";

const AddEmployee = () => {
  const [showA, setShowA] = useState(false);
  const closeA = () => setShowA(false);
  const openA = () => setShowA(true);
  const [showB, setShowB] = useState(false);
  const closeB = () => setShowB(false);
  const openB = () => setShowB(true);
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid Email").required(),
    pwd: yup
      .string()
      .max(16, "Password length should not exceed 16 characters")
      .required("Enter to set Password"),
    confirmedPwd: yup
      .string()
      .oneOf(
        [yup.ref("pwd"), null],
        "Does not match with the Password set above"
      )
      .required("Confirm Password is a required field"),
    role: yup.string().required("Please select a Role"),
  });

  const onSuccess = (values) => {
    setLoading(true);
    const payload = {};
    payload["firstName"] = values.firstName;
    payload["lastName"] = values.lastName;
    payload["email"] = values.email;
    payload["password"] = values.pwd;
    payload["role"] = values.role;
    payload["isPasswordTemp"] = "TRUE";

    employeeService
      .addEmployees(payload)
      .then(() => {
        openB();
      })
      .catch(() => {
        setLoading(false);
        openA();
      });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={4} md={6} />
        <Col lg={4} md={6}>
          <Card>
            <Card.Header className="text-center">
              <h4>Add an Employee</h4>
            </Card.Header>
            <Card.Body>
              <Formik
                validationSchema={schema}
                validateOnChange={true}
                onSubmit={onSuccess}
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  pwd: "",
                  confirmedPwd: "",
                  role: "0",
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  resetForm,
                  values,
                  touched,
                  isValid,
                  errors,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group
                      className="mb-3"
                      size="lg"
                      controlId="firstName"
                    >
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.firstName && errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" size="lg" controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.lastName && errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" size="lg" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" size="lg" controlId="pwd">
                      <Form.Label>Set Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="pwd"
                        value={values.pwd}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.pwd && errors.pwd}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pwd}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      size="lg"
                      controlId="confirmedPwd"
                    >
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmedPwd"
                        value={values.confirmedPwd}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.confirmedPwd && errors.confirmedPwd}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmedPwd}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" size="lg" controlId="role">
                      <Form.Label>Employee Role</Form.Label>
                      <Form.Select
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.role && errors.role}
                      >
                        <option key="0R" value="0">
                          Software Development Engineer
                        </option>
                        <option key="1R" value="1">
                          Project Manager
                        </option>
                        <option key="2R" value="2">
                          Administrator
                        </option>
                      </Form.Select>
                    </Form.Group>

                    <br />
                    <div className="d-grid">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={values.firstName.length === 0 || !isValid}
                      >
                        Submit
                      </Button>
                      <br />
                      <Button
                        variant="secondary"
                        type="reset"
                        onClick={resetForm}
                      >
                        Reset
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={6} />
      </Row>
      <br />
      <Row className="justify-content-center">
        <Toast
          className="text-center"
          bg="danger"
          style={{ width: "18rem" }}
          show={showA}
          onClose={closeA}
          position="middle-center"
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">ERROR!</strong>
          </Toast.Header>
          <Toast.Body>
            <h6>Employee could NOT be added!</h6>
          </Toast.Body>
        </Toast>
      </Row>
      <br />
      <Row className="justify-content-center">
        <Toast
          className="text-center"
          bg="success"
          style={{ width: "18rem" }}
          show={showB}
          onClose={closeB}
          position="middle-center"
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">SUCCESS!</strong>
          </Toast.Header>
          <Toast.Body>
            <h6>Employee Added Successfully!</h6>
          </Toast.Body>
        </Toast>
      </Row>
    </Container>
  );
};

export default AddEmployee;
