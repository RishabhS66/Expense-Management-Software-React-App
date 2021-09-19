import React, { useRef } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addClient, updateClient } from "../../actions/client";

export default function AddClient(props) {
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    fullName: yup.string().required("Client Name is required"),
    nickName: yup.string().required("Client Nick Name is required"),
    email: yup
      .string()
      .email()
      .required("Email is required")
      .typeError("Invalid Email"),
    website: yup
      .string()
      .matches(
        /^(?:https?:\/\/|s?ftps?:\/\/)?(?!www | www\.)[A-Za-z0-9_-]+\.+[A-Za-z0-9.\/%&=\?_:;-]+$/
      )
      .typeError("Invalid URL"),
    billDetails: yup.string(),
    address: yup.object().shape({
      addressLine1: yup.string().required("Address1 is required"),
      addressLine2: yup.string().required("Address2 is required"),
      city: yup.string().required("City is required"),
      state: yup.string().required("State is required"),
      country: yup.string().required("Country is required"),
      zipcode: yup
        .number()
        .typeError("Zipcode must be a numerical value")
        .required("Zipcode is required"),
      telephone1: yup
        .number()
        .required("Telephone is required")
        .typeError("Telephone must be a numerical value"),
      telephone2: yup.number().typeError("Telephone must be a numerical value"),
      fax: yup.string(),
    }),
  });
  const getModifiedValues = (values, initialValues) => {
    let modifiedValues = {};

    if (values) {
      Object.entries(values).forEach((entry) => {
        let key = entry[0];
        let value = entry[1];

        if (value !== initialValues[key]) {
          modifiedValues[key] = value;
        }
      });
    }

    return modifiedValues;
  };
  const onSuccess = (values) => {
    if (props.method === "Add") {
      dispatch(addClient(values))
        .then(() => {
          // history.push("/home");
          props.onHide();
        })
        .catch(() => {
          alert("Could Not Add Client!");
          // setLoading(false);
        });
    } else if (props.method === "Update") {
      const modifiedValues = getModifiedValues(values, props.data);
      dispatch(updateClient(props.index, modifiedValues))
        .then(() => {
          // history.push("/home");
          props.onHide();
        })
        .catch(() => {
          // setLoading(false);
          alert("Could Not Update Client!");
          return;
        });
    }
  };

  const formRef = useRef();
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <Modal onHide={props.onHide} show={props.show} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{props.method} Client</Modal.Title>
      </Modal.Header>
      <Formik
        validationSchema={schema}
        validateOnChange={true}
        onSubmit={onSuccess}
        initialValues={props.data}
        innerRef={formRef}
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
            <Modal.Body>
              <Row>
                <Form.Group as={Col} controlId="clientName">
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.fullName && errors.fullName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <br />
              <Tabs defaultActiveKey="basic">
                <Tab eventKey="basic" title="Basic">
                  <br />
                  <Row>
                    <Form.Group as={Col} controlId="clientNick">
                      <Form.Label>Client Nick</Form.Label>
                      <Form.Control
                        name="nickName"
                        value={values.nickName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.nickName && errors.nickName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nickName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="email">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
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
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="website">
                      <Form.Label>Website</Form.Label>
                      <Form.Control
                        name="website"
                        value={values.website}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.website && errors.website}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.website}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="billingRate">
                      <Form.Label>Default Billing Rate</Form.Label>
                      <Form.Control
                        name="billDetails"
                        value={values.billDetails}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.billDetails && errors.billDetails}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.billDetails}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </Tab>

                <Tab eventKey="details" title="Details">
                  <br />
                  <Row>
                    <Form.Group as={Col} controlId="address1">
                      <Form.Label>Address1</Form.Label>
                      <Form.Control
                        name="address.addressLine1"
                        value={values.address.addressLine1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          errors.address &&
                          touched.address &&
                          touched.address.addressLine1 &&
                          errors.address.addressLine1
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address && errors.address.addressLine1}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="address2">
                      <Form.Label>Address2</Form.Label>
                      <Form.Control
                        name="address.addressLine2"
                        value={values.address.addressLine2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          errors.address &&
                          touched.address &&
                          touched.address.addressLine2 &&
                          errors.address.addressLine2
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address && errors.address.addressLine2}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="country">
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        name="address.country"
                        defaultValue="Choose..."
                        value={values.address.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          errors.address &&
                          touched.address &&
                          touched.address.country &&
                          errors.address.country
                        }
                      >
                        <option key="SC" value="" disabled>
                          Select Country
                        </option>

                        <option value="US">US</option>
                        <option value="India">India</option>
                        <option value="Canada">Canada</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        name="address.city"
                        value={values.address.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          errors.address &&
                          touched.address &&
                          touched.address.city &&
                          errors.address.city
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address && errors.address.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="state">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        name="address.state"
                        value={values.address.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          errors.address &&
                          touched.address &&
                          touched.address.state &&
                          errors.address.state
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address && errors.address.state}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="zipcode">
                      <Form.Label>Zipcode</Form.Label>
                      <Form.Control
                        name="address.zipcode"
                        value={values.address.zipcode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          errors.address &&
                          touched.address &&
                          touched.address.zipcode &&
                          errors.address.zipcode
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address && errors.address.zipcode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="telephone1">
                      <Form.Label>Telephone1</Form.Label>
                      <Form.Control
                        name="address.telephone1"
                        value={values.address.telephone1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          errors.address &&
                          touched.address &&
                          touched.address.telephone1 &&
                          errors.address.telephone1
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address && errors.address.telephone1}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="telephone2">
                      <Form.Label>Telephone2</Form.Label>
                      <Form.Control
                        name="address.telephone2"
                        value={values.address.telephone2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          errors.address &&
                          touched.address &&
                          touched.address.telephone2 &&
                          errors.address.telephone2
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address && errors.address.telephone2}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="fax">
                      <Form.Label>Fax</Form.Label>
                      <Form.Control
                        name="address.fax"
                        value={values.address.fax}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          errors.address &&
                          touched.address &&
                          touched.address.fax &&
                          errors.address.fax
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address && errors.address.fax}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </Tab>
              </Tabs>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                type="submit"
                onClick={handleSubmit}
                disabled={values.fullName.length === 0 || !isValid}
              >
                {props.method} Client
              </Button>
              <Button variant="secondary" onClick={props.onHide}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
