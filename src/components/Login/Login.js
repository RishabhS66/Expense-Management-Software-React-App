import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../actions/auth";
import { Container, Card, Row, Toast, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

export default function Login() {
  const schema = yup.object().shape({
    email: yup.string().email("Invalid Email").required(),
    password: yup.string().required(),
  });

  let history = useHistory();
  const [loading, setLoading] = useState(false);

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  
  const [showA, setShowA] = useState(false);
  const closeA = () => setShowA(false);
  const openA = () => setShowA(true);

  const dispatch = useDispatch();
  
  const onSuccess = (values) => {
    setLoading(true);

    dispatch(login(values.email, values.password))
      .then((response) => {
        if(response.isPasswordTemp){
          history.push("/changepwd");
        }
        else{
          history.push("/home");
        }
      })
      .catch(() => {
        setLoading(false);
        openA();
      });
  };

  if (isLoggedIn && !user.isPasswordTemp) {
    return <Redirect to="/home" />;
  }
  if (isLoggedIn && user.isPasswordTemp){
    return <Redirect to="/changepwd" />;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={4} md={6} />
        <Col lg={4} md={6}>
          <Card>
            <Card.Header className="text-center">
              <h4>Login Portal</h4>
            </Card.Header>
            <Card.Body>
              <Formik
                validationSchema={schema}
                validateOnChange={true}
                onSubmit={onSuccess}
                initialValues={{
                  email: "",
                  password: "",
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" size="lg" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        autoFocus
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

                    <Form.Group size="lg" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && errors.password}
                      />
                    </Form.Group>
                    <br />
                    <div className="d-grid">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={!isValid}
                      >
                        Login
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
            <h6>Invalid Login Credentials!</h6>
          </Toast.Body>
        </Toast>
      </Row>
    </Container>
  );
}
