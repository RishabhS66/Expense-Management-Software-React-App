import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import {
  Container,
  Card,
  Row,
  Toast,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { changePwd } from "../../actions/auth";

const ChangePassword = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [showA, setShowA] = useState(false);
  const closeA = () => setShowA(false);
  const openA = () => setShowA(true);
  const [showB, setShowB] = useState(false);
  const closeB = () => setShowB(false);
  const openB = () => setShowB(true);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("Sorry!");

  const schema = yup.object().shape({
    oldPwd: yup.string().required("Enter Old Password"),
    newPwd: yup
      .string()
      .notOneOf([yup.ref("oldPwd")], "New Password matches Old Password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8-16 Characters, One Uppercase, One Lowercase, One Number and One Special Character"
      )
      .max(16, "Password length should not exceed 16 characters")
      .required("Enter New Password"),
    confirmedPwd: yup
      .string()
      .oneOf([yup.ref("newPwd"), null], "Does not match with the New Password")
      .required("Confirm Password is a required field"),
  });

  const dispatch = useDispatch();

  const onSuccess = (values) => {
    setLoading(true);

    dispatch(changePwd(values.oldPwd, values.newPwd, values.confirmedPwd))
      .then((response) => {
        if (response.isPasswordTemp) {
          openA();
        } else {
          openB();
        }
      })
      .catch((msg) => {
        setErrMsg(msg);
        setLoading(false);
        openA();
      });
  };
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={4} md={6} />
        <Col lg={4} md={6}>
          <Card>
            <Card.Header className="text-center">
              <h4>Change Password</h4>
            </Card.Header>
            <Card.Body>
              <Formik
                validationSchema={schema}
                validateOnChange={true}
                onSubmit={onSuccess}
                initialValues={{
                  oldPwd: "",
                  newPwd: "",
                  confirmedPwd: "",
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
                    <Form.Group className="mb-3" size="lg" controlId="oldPwd">
                      <Form.Label>Temporary or Old Password</Form.Label>
                      <Form.Control
                        // autoFocus
                        type="password"
                        name="oldPwd"
                        value={values.oldPwd}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.oldPwd && errors.oldPwd}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.oldPwd}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" size="lg" controlId="newPwd">
                      <Form.Label>New Password</Form.Label>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            <strong>
                              Password Must Contain 8-16 Characters, One Uppercase [A-Z],
                              One Lowercase [a-z], One Number [0-9] and One Special Character [!@#$%^&*]
                            </strong>
                          </Tooltip>
                        }
                      >
                        <Form.Control
                          type="password"
                          name="newPwd"
                          value={values.newPwd}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.newPwd && errors.newPwd}
                        />
                      </OverlayTrigger>
                      <Form.Control.Feedback type="invalid">
                        {errors.newPwd}
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
                    <br />
                    <div className="d-grid">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={values.oldPwd.length === 0 || !isValid}
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
            <h6>Password could not be reset: {errMsg}</h6>
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
            <h6>Password Changed Successfully! Click <Card.Link as={Link} to="/home" style={{color: 'white'}}>here</Card.Link> to go to Home! </h6>
          </Toast.Body>
        </Toast>
      </Row>
    </Container>
  );
};

export default ChangePassword;
