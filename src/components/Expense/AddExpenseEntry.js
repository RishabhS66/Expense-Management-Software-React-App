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
import "./Expense.css";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { getExpenseSheets } from "../../actions/expense.actions";
import { getProjects } from "../../actions/project";
import { editEntry } from "../../actions/expense.actions";
import { addEntry } from "../../actions/expense.actions";
import attachmentsService from "../../services/attachments.service";

const AddExpenseEntry = (props) => {
  const dispatch = useDispatch();
  var data = props.data;

  useEffect(() => {
    dispatch(getProjects())
      .then(() => {
        // console.log("Projects fetched successfully");
        return;
      })
      .catch(() => {
        alert("Unable to fetch projects");
      });
  }, [dispatch]);

  const transformDate = (date) => {
    const splitDate = date.split("-");
    const newDateList = splitDate.reverse();
    const newDate = newDateList.join("-");

    return newDate;
  };

  const schema = yup.object().shape({
    name: yup.string().required("Required!"),
    paymentMethod: yup.string().required("Required!"),
    currency: yup.string().required("Required!"),
    billable: yup.bool().required("Required!"),
    reimburseable: yup.bool().required("Required!"),
    amount: yup
      .number()
      .min(0, "Minumim value must be 0")
      .test(
        'has-2-decimal',
        'Maximum 2 dgits after decimal point',
         value => (value + "").match(/^(?:\d*\.\d{1,2}|\d+)$/),
      )
      .typeError("Cost must be a numerical value")
      .required("Required!"),
    taxZone: yup.string().required("Required!"),
    tax: yup
      .number()
      .min(0, "Minumim value must be 0")
      .test(
        'has-2-decimal',
        'Maximum 2 dgits after decimal point',
         value => (value + "").match(/^(?:\d*\.\d{1,2}|\d+)$/),
      )
      .typeError("Cost must be a numerical value")
      .required("Required!"),
    description: yup.string().required("Required!"),
    file: yup.mixed().required("Required!"),
  });

  const schemaEdit = yup.object().shape({
    name: yup.string().required("Required!"),
    paymentMethod: yup.string().required("Required!"),
    currency: yup.string().required("Required!"),
    billable: yup.bool().required("Required!"),
    reimburseable: yup.bool().required("Required!"),
    amount: yup
      .number()
      .min(0, "Minumim value must be 0")
      .test(
        'has-2-decimal',
        'Maximum 2 dgits after decimal point',
         value => (value + "").match(/^(?:\d*\.\d{1,2}|\d+)$/),
      )
      .typeError("Cost must be a numerical value")
      .required("Required!"),
    taxZone: yup.string().required("Required!"),
    tax: yup
      .number()
      .min(0, "Minumim value must be 0")
      .test(
        'has-2-decimal',
        'Maximum 2 dgits after decimal point',
         value => (value + "").match(/^(?:\d*\.\d{1,2}|\d+)$/),
      )
      .typeError("Cost must be a numerical value")
      .required("Required!"),
    description: yup.string().required("Required!"),
  });

  const [loading, setLoading] = useState(false);
  const dummyForm = new FormData();
  const [fileData, setFileData] = useState(dummyForm);
  const [fileChange, setFileChange] = useState(0);
  const { projects } = useSelector((state) => state.project);
  const { user: currentUser } = useSelector((state) => state.auth);

  const onSuccess = (values) => {
    const payload = {};
    payload["project"] = { id: Number(values.projectName) };
    payload["name"] = values.name;
    payload["currency"] = values.currency;
    payload["date"] = transformDate(values.date);
    payload["billable"] = values.billable;
    payload["reimburseable"] = values.reimburseable;
    payload["amount"] = values.amount;
    payload["taxZone"] = values.taxZone;
    payload["tax"] = values.tax;
    payload["paymentMethod"] = values.paymentMethod;
    payload["status"] = "SUBMITTED";
    payload["description"] = values.description;
    payload["attachments"] = [];

    props.onHide();

    setLoading(true);

    attachmentsService
      .uploadDoc(fileData)
      .then((response) => {
        // payload["attachments"].push(response);
        payload["attachments"] = [{"id":response.id}];
        dispatch(addEntry(payload))
          .then(() => {
            dispatch(getExpenseSheets())
              .then(() => {
                // console.log("Expenses fetched successfully");
                return;
              })
              .catch(() => {
                alert("Unable to fetch Expenses");
              });
          })
          .catch(() => {
            alert("Expense Could Not be Added!");
            setLoading(false);
          });
      })
      .catch(() => {
        alert("File Could Not Be Attached!");
      });
  };

  const onSuccessEdit = (values) => {
    const payload = {};
    payload["name"] = values.name;
    payload["currency"] = values.currency;
    payload["billable"] = values.billable;
    payload["reimburseable"] = values.reimburseable;
    payload["amount"] = values.amount;
    payload["taxZone"] = values.taxZone;
    payload["tax"] = values.tax;
    payload["paymentMethod"] = values.paymentMethod;
    payload["description"] = values.description;
    // payload["attachments"] = [];
    props.onHide();
    setLoading(true);

    if (fileChange === 1) {
      attachmentsService
        .uploadDoc(fileData)
        .then((response) => {
          // payload["attachments"] = [response];
          // console.log("File Changed -> ", payload);
          payload["attachments"] = [{"id":response.id}];
          dispatch(editEntry(data.expenseId, payload))
            .then(() => {
              dispatch(getExpenseSheets())
                .then(() => {
                  // console.log("Expenses fetched successfully");
                  return;
                })
                .catch(() => {
                  alert("Unable to fetch Expenses");
                });
            })
            .catch(() => {
              alert("Could Not Edit Expense!")
              setLoading(false);
            });
        })
        .catch(() => {
          alert("File Could Not Be Attached!");
        });
    } else {
      dispatch(editEntry(data.expenseId, payload))
        .then(() => {
          dispatch(getExpenseSheets())
            .then(() => {
              // console.log("Expense updated successfully");
              return;
            })
            .catch(() => {
              alert("Unable to update Expense");
            });
        })
        .catch(() => {
          alert("Could Not Edit Expense!")
          setLoading(false);
        });
    }
  };

  
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };
  const formRef = useRef();

  const onFileChangeHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    if (e.target.files.length > 0) setFileChange(1);
    if (e.target.files.length === 0) setFileChange(0);
    setFileData(formData);
  };

  return (
    <Modal {...props} backdrop="static" size="lg" id="entry-modal">
      <Modal.Header closeButton>
        <Modal.Title>{props.method} Expense Entry</Modal.Title>
      </Modal.Header>

      <Formik
        key="Formik"
        validationSchema={props.method === "Edit" ? schemaEdit : schema}
        validateOnChange={true}
        onSubmit={props.method === "Edit" ? onSuccessEdit : onSuccess}
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
              <Tabs defaultActiveKey="basic">
                <Tab eventKey="basic" title="Basic">
                  <br />
                  <Row>
                    <Form.Group as={Col} controlId="projectName">
                      <Form.Label>
                        <small>Project name</small>
                      </Form.Label>
                      <Form.Select
                        name="projectName"
                        value={values.projectName}
                        disabled={props.method === "Edit"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.projectName && errors.projectName}
                      >
                        <option key="SP" value="" disabled>
                          Select Project
                        </option>
                        {projects.map((project) => {
                          return (
                            <option key={project.id} value={project.id}>
                              {project.projectName}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="name">
                      <Form.Label>
                        <small>Expense Name </small>
                      </Form.Label>
                      <Form.Control
                        // as="textarea"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.name && errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="paymentMethod">
                      <Form.Label>
                        <small>Payment Method</small>
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        name="paymentMethod"
                        value={values.paymentMethod}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.paymentMethod && errors.paymentMethod
                        }
                      >
                        <option></option>
                        <option value="CASH">CASH</option>
                        <option value="CARD">CARD</option>
                        <option value="ONLINE TRANSACTION">
                          ONLINE TRANSACTION
                        </option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.paymentMethod}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="currency">
                      <Form.Label>
                        <small>Currency</small>
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        name="currency"
                        value={values.currency}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.currency && errors.currency}
                      >
                        <option></option>
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.currency}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group as={Col} controlId="date">
                      <Form.Label>
                        <small>Expense Entry Date </small>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={values.date}
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="billable">
                      <Form.Label>
                        <small>Billable</small>
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        name="billable"
                        value={values.billable}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.billable && errors.billable}
                      >
                        <option></option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.billable}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="reimburseable">
                      <Form.Label>
                        <small>Reimburse</small>
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        name="reimburseable"
                        value={values.reimburseable}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.reimburseable && errors.reimburseable
                        }
                      >
                        <option></option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.reimburseable}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="amount">
                      <Form.Label>
                        <small>Net Amount</small>
                      </Form.Label>
                      <Form.Control
                        name="amount"
                        value={values.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.amount && errors.amount}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.amount}
                      </Form.Control.Feedback>{" "}
                    </Form.Group>
                    <Form.Group as={Col} controlId="taxZone">
                      <Form.Label>
                        <small>Tax Zone</small>
                      </Form.Label>

                      <Form.Select
                        aria-label="Default select example"
                        name="taxZone"
                        value={values.taxZone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.taxZone && errors.taxZone}
                      >
                        <option></option>
                        <option value="IND">IND</option>
                        <option value="USA">USA</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.taxZone}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="tax">
                      <Form.Label>
                        <small>Tax</small>
                      </Form.Label>
                      <Form.Control
                        name="tax"
                        value={values.tax}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.tax && errors.tax}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.tax}
                      </Form.Control.Feedback>{" "}
                    </Form.Group>
                    <Form.Group as={Col} controlId="netAmount">
                      <Form.Label>
                        <small>Amount</small>
                      </Form.Label>
                      <Form.Control
                        name="netAmount"
                        value={String(
                          Number(values.amount) + Number(values.tax)
                        )}
                        readOnly
                      />
                    </Form.Group>
                  </Row>
                </Tab>

                <Tab eventKey="description" title="Description">
                  <br />
                  <Form.Group className="mb-3" controlId="description">
                    <Form.Control
                      as="textarea"
                      type="long-description"
                      name="description"
                      placeholder="Enter description of expense here"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.description && errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>{" "}
                  </Form.Group>
                </Tab>
                <Tab eventKey="attachment" title="Attachment">
                  <br />
                  <Form.Group className="mb-3" controlId="file">
                    <Form.Group className="position-relative mb-3">
                      <Form.Label>Upload File (PDFs only)</Form.Label>
                      <Form.Control
                        type="file"
                        name="file"
                        accept=".pdf"
                        onChange={(e) => {
                          handleChange(e);
                          onFileChangeHandler(e);
                        }}
                        isInvalid={!!errors.file}
                        // disabled={props.method === "Edit"}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.file}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {data.attachments.length > 0 &&
                      "File Already Uploaded : " + data.attachments[0].docName}
                  </Form.Group>
                </Tab>
              </Tabs>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="success"
                type="submit"
                onClick={handleSubmit}
                disabled={values.name.length === 0 || !isValid}
              >
                {props.method} Expense Entry
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
};

export default AddExpenseEntry;
