import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Dropdown, DropdownButton, ToastContainer } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Toast } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProjects } from "../../actions/project";
import { getProjects } from "../../actions/project";
import { editProject } from "../../actions/project";
import { useRef } from "react";

const AddProject = (props) => {
  const schema = yup.object().shape({
    projectName: yup.string().required("Project Name is required"),
    client: yup.string().required("Please select a Client"),
    projectManager: yup.string().required("Please select a Project Manager"),
    projectDescription: yup.string(),
    duration: yup
      .number()
      .min(0, "Minumim value must be 0")
      .typeError("Duration must be a numerical value")
      .required("Duration is required"),
    cost: yup
      .number()
      .min(0, "Minumim value must be 0")
      .typeError("Cost must be a numerical value")
      .required("Cost is required"),
    startDate: yup
      .date()
      .min(new Date("01/01/2000"), "Start Date must be after 01-01-2000")
      .max(yup.ref("endDate"), "Start Date must be before Due Date")
      .required("Start Date is required"),
    endDate: yup
      .date()
      .min(yup.ref("startDate"), "Due Date must be after Start Date")
      .required("Due Date is required"),
  });
  const [toast, setToast] = useState(false);
  const [counter, setCounter] = useState(0);
  const closeToast = () => setToast(false);
  const openToast = () => setToast(true);

  const [toastEdit, setToastEdit] = useState(false);
  const closeToastEdit = () => setToastEdit(false);
  const openToastEdit = () => setToastEdit(true);

  const { employees } = useSelector((state) => state.employees);
  const { clients } = useSelector((state) => state.client);
  const { user: currentUser } = useSelector((state) => state.auth);
  let { id } = currentUser;
  var data = props.data;
  if (props.method === "Edit") {
    id = data.projectManager;
  }
  else{
    id = currentUser.id;
  }
  
  const k = employees.filter((e) => Number(e.id) === Number(id))[0];
  const [membersAdded, setMembersAdded] = useState([
    { firstname: "", lastname: "", id: -1 },
  ]);
  const [track, setTrack] = useState(data.projectID);

  if(track!==data.projectID){
    setMembersAdded([
      { firstname: "", lastname: "", id: -1 },
    ])
    setTrack(data.projectID);
    setCounter(0);
  }

  if (
    (membersAdded.length === 1 &&
    membersAdded[0].id === -1 &&
    k !== undefined)
  ) {
    let membersAdded_cpy = [k];
    setMembersAdded(membersAdded_cpy);
  }
  
  const employees_cpy = [...employees];
  
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <>
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to find..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
            ref={ref}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value ||
                child.props.children
                  .toLowerCase()
                  .indexOf(value.toLowerCase()) >= 0
            )}
          </ul>
        </>
      );
    }
  );

  const addMembers = (id) => () => {
    const membersAdded_cpy = [...membersAdded];
    const check = membersAdded_cpy.filter((m) => Number(m.id) === Number(id));
    if (check.length !== 0) return;
    const toAdd = employees_cpy.filter((e) => Number(e.id) === Number(id))[0];
    membersAdded_cpy.push(toAdd);
    setMembersAdded(membersAdded_cpy);
    return;
  };

  if (counter === 0) {
    let ctr = 0;
    let samePm = 0;
    const membersAdded_cpy = [...membersAdded];
    for (var i = 0; i < data.teamMembers.length; i++) {
      ctr++;
      if(data.teamMembers[i].id === id) samePm = 1;
      const check = membersAdded_cpy.filter(
        (m) => Number(m.id) === Number(data.teamMembers[i].id)
      );
      if (check.length !== 0) continue;
      const toAdd = employees_cpy.filter(
        (e) => Number(e.id) === Number(data.teamMembers[i].id)
      )[0];
      membersAdded_cpy.push(toAdd);
    }
    let oldCounter = counter;
    if (ctr !== 0) {
      if(samePm === 0 && membersAdded_cpy.length === data.teamMembers.length){
        const projMgr = employees.filter((e) => Number(e.id) === Number(id))[0];
        membersAdded_cpy.push(projMgr);
      }
      const membersAdded_final = [];
      for(var i=0;i<membersAdded_cpy.length;i++){
        const check1 = data.teamMembers.filter(tm => Number(tm.id) === membersAdded_cpy[i].id);
        const check2 = Number(data.projectManager) === Number(membersAdded_cpy[i].id);
        if(check1.length === 0 && !check2){
          continue;
        }
        else{
          membersAdded_final.push(membersAdded_cpy[i]);
        }

      }
      setMembersAdded(membersAdded_final);
      setCounter(oldCounter + 1);
    }
  }

  const deleteMembers = (id) => () => {
    const updateMembers = [...membersAdded].filter(
      (m) => Number(m.id) !== Number(id)
    );
    setMembersAdded(updateMembers);
    return;
  };

  const transformDate = (date, end) => {
    const tStart = "00:00:00";
    const tEnd = "23:59:00";
    const splitDate = date.split("-");
    const newDateList = splitDate.reverse();
    const newDate = newDateList.join("-");
    let finalDate = "";
    if (end === 0) {
      finalDate = newDate + " " + tStart;
    } else {
      finalDate = newDate + " " + tEnd;
    }
    return finalDate;
  };

  const dispatch = useDispatch();

  const onSuccess = (values) => {
    const pmId = values.projectManager;
    const statusType = {
      "To-Do": "TO_DO",
      "In Progress": "IN_PROGRESS",
      Completed: "COMPLETED",
      Suspended: "SUSPENDED",
    };
    const payload = {};
    payload["attachments"] = [];
    payload["projectName"] = values.projectName;
    payload["client"] = { id: Number(values.client) };
    payload["projectManager"] = { id: Number(values.projectManager) };
    payload["teamMembers"] = membersAdded
      .filter((m) => Number(m.id) !== Number(pmId) && Number(id) !== Number(m.id))
      .map((m) => {
        return { id: Number(m.id) };
      });
    payload["description"] = values.projectDescription;
    payload["startDate"] = transformDate(values.startDate, 0);
    payload["endDate"] = transformDate(values.endDate, 1);
    payload["status"] = statusType[values.status];
    props.onHide();
    
    dispatch(addProjects(payload))
      .then(() => {
        dispatch(getProjects())
          .then(() => {
            // console.log("Projects fetched successfully");
            return;
          })
          .catch(() => {
            alert("Unable to fetch projects");
          });
      })
      .catch(() => {
        openToast();
      });
  };
  
  const onSuccessEdit = (values) => {
    const pmId = values.projectManager;
    const statusType = {
      "To-Do": "TO_DO",
      "In Progress": "IN_PROGRESS",
      Completed: "COMPLETED",
      Suspended: "SUSPENDED",
    };
    const payload = {};
    payload["attachments"] = [];
    payload["projectName"] = values.projectName;
    payload["client"] = { id: Number(values.client) };
    payload["projectManager"] = { id: Number(values.projectManager) };
    payload["teamMembers"] = membersAdded
      .filter((m) => Number(m.id) !== Number(pmId))
      .map((m) => {
        return { id: Number(m.id) };
      });
    payload["description"] = values.projectDescription;
    payload["startDate"] = transformDate(values.startDate, 0);
    payload["endDate"] = transformDate(values.endDate, 1);
    payload["status"] = statusType[values.status];
    props.onHide();

    dispatch(editProject(data.projectID, payload))
      .then(() => {
        dispatch(getProjects())
          .then(() => {
            // console.log("Projects fetched successfully");
            return;
          })
          .catch(() => {
            alert("Unable to fetch projects");
          });
      })
      .catch(() => {
        openToastEdit();
      });
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };
  const formRef = useRef();

  return (
    <>
      <Modal
        onHide={props.onHide}
        show={props.show}
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.method} Project</Modal.Title>
        </Modal.Header>
        <Formik
          key="Formik"
          validationSchema={schema}
          validateOnChange={true}
          onSubmit={props.method === "Edit" ? onSuccessEdit : onSuccess}
          initialValues={data}
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
                  <Form.Group as={Col} controlId="projectName">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                      name="projectName"
                      value={values.projectName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.projectName && errors.projectName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.projectName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <br />
                <Tabs defaultActiveKey="basic">
                  <Tab eventKey="basic" title="Basic">
                    <br />
                    <Row>
                      <Form.Group as={Col} controlId="clientName">
                        <Form.Label>Client Name</Form.Label>
                        <Form.Select
                          name="client"
                          value={values.client}
                          disabled={props.method === "Edit"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.client && errors.client}
                        >
                          <option key="SC" value="" disabled>
                            Select Client
                          </option>
                          {clients.map((client) => {
                            return (
                              <option key={client.id} value={client.id}>
                                {client.fullName +
                                  " (Client ID: " +
                                  client.id +
                                  ")"}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col} controlId="teamLead">
                        <Form.Label>Team Lead</Form.Label>
                        <Form.Select defaultValue="Choose..." disabled>
                          <option key="NA">---</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} controlId="projectManager">
                        <Form.Label>Project Manager</Form.Label>
                        <Form.Select
                          name="projectManager"
                          value={values.projectManager}
                          disabled={props.method === "Edit"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={
                            touched.projectManager && errors.projectManager
                          }
                        >
                          <option key="SPM" value="" disabled>
                            Select Project Manager
                          </option>
                          {employees
                            .filter((e) => e.role === 1 && e.id === id)
                            .map((e) => {
                              return (
                                <option key={e.id} value={e.id}>
                                  {e.firstname +
                                    " " +
                                    e.lastname +
                                    " (Employee ID: " +
                                    e.id +
                                    ")"}
                                </option>
                              );
                            })}
                          {employees
                            .filter((e) => e.role === 1 && e.id !== id)
                            .map((e) => {
                              return (
                                <option key={e.id} value={e.id}>
                                  {e.firstname +
                                    " " +
                                    e.lastname +
                                    " (Employee ID: " +
                                    e.id +
                                    ")"}
                                </option>
                              );
                            })}
                        </Form.Select>
                      </Form.Group>
                    </Row>
                  </Tab>

                  <Tab eventKey="team" title="Team">
                    <br />
                    <Row>
                      <Form.Group controlId="teamMembers">
                        <DropdownButton
                          title="Search and Add Team Members "
                          variant="secondary"
                          key="down"
                        >
                          <Dropdown.Menu as={CustomMenu}>
                            {employees.map((e) => {
                              return (
                                <Dropdown.Item
                                  eventKey={e.id}
                                  onClick={addMembers(e.id)}
                                >
                                  {e.firstname +
                                    " " +
                                    e.lastname +
                                    " (Employee ID: " +
                                    e.id +
                                    ")"}
                                </Dropdown.Item>
                              );
                            })}
                          </Dropdown.Menu>
                        </DropdownButton>
                      </Form.Group>
                    </Row>
                    <br />
                    <Row>
                      <Form.Group as={Col} controlId="teamMembers">
                        <Form.Label>
                          <strong>Team Members: {membersAdded.length}</strong>
                        </Form.Label>
                        <ul>
                          {membersAdded.map((m) => {
                            return (
                              <li key={m.id}>
                                {m.firstname +
                                  " " +
                                  m.lastname +
                                  " (Employee ID: " +
                                  m.id +
                                  ")  "}
                                <Button
                                  className="m-0 p- border-0"
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={deleteMembers(m.id)}
                                  disabled={m.id === id}
                                >
                                  <i className="bi bi-x-lg"></i>
                                </Button>
                              </li>
                            );
                          })}
                        </ul>
                      </Form.Group>
                    </Row>
                  </Tab>

                  <Tab eventKey="approvals" title="Approvals">
                    <br />
                    <Row>
                      <Form.Group as={Col} controlId="timeSheetApproval">
                        <Form.Label>Timesheet Approval Type</Form.Label>
                        <Form.Select defaultValue="Choose...">
                          <option key="TL">Team Lead</option>
                          {/* <option>Project Manager</option> */}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} controlId="expenseApproval">
                        <Form.Label>Expense Approval Type</Form.Label>
                        <Form.Select defaultValue="Choose...">
                          <option key="PM">Project Manager</option>
                        </Form.Select>
                      </Form.Group>
                    </Row>
                  </Tab>

                  <Tab eventKey="advanced" title="Advanced">
                    <br />
                    <Form.Group controlId="projDescription">
                      <Form.Label>Project Description</Form.Label>
                      <FloatingLabel controlId="projDescriptionText">
                        <Form.Control
                          as="textarea"
                          placeholder="Leave a comment here"
                          style={{ height: "100px" }}
                          name="projectDescription"
                          value={values.projectDescription}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={
                            touched.projectDescription &&
                            errors.projectDescription
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.projectDescription}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Row>
                      <Form.Group as={Col} controlId="duration">
                        <Form.Label>Duration (Hours)</Form.Label>
                        <Form.Control
                          name="duration"
                          value={values.duration}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.duration && errors.duration}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.duration}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} controlId="estimatedCost">
                        <Form.Label>Project Estimated Cost (Rs.)</Form.Label>
                        <Form.Control
                          name="cost"
                          value={values.cost}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.cost && errors.cost}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cost}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col} controlId="projectStatus">
                        <Form.Label>Project Status</Form.Label>
                        <Form.Select
                          name="status"
                          value={values.status}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option key="TD">To-Do</option>
                          <option key="IP">In Progress</option>
                          <option key="S">Suspended</option>
                          <option key="C">Completed</option>
                        </Form.Select>
                      </Form.Group>
                    </Row>
                  </Tab>
                  <Tab eventKey="dates" title="Dates">
                    <br />
                    <Row>
                      <Form.Group as={Col} controlId="startDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="startDate"
                          value={values.startDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.startDate && errors.startDate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.startDate}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} controlId="dueDate">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="endDate"
                          value={values.endDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.endDate && errors.endDate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.endDate}
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
                  disabled={values.projectName.length === 0 || !isValid}
                >
                  {props.method} Project
                </Button>
                <Button variant="secondary" onClick={props.onHide}>
                  Close
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>

      <ToastContainer position="top-center">
        <Toast
          className="text-center"
          bg="danger"
          style={{ width: "18rem" }}
          show={toast}
          onClose={closeToast}
          position="middle-center"
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">ERROR!</strong>
          </Toast.Header>
          <Toast.Body>
            <h6>Project Could NOT Be Added!</h6>
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <ToastContainer position="top-center">
        <Toast
          className="text-center"
          bg="danger"
          style={{ width: "18rem" }}
          show={toastEdit}
          onClose={closeToastEdit}
          position="middle-center"
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">ERROR!</strong>
          </Toast.Header>
          <Toast.Body>
            <h6>Project Could NOT Be Updated!</h6>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default AddProject;
