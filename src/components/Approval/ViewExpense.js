import React from "react";
import { Modal, Button, Row, Col, Badge, Table } from "react-bootstrap";
import attachmentsService from "../../services/attachments.service";
import "./Approval.css"

const ViewExpense = (props) => {
  const data = props.data;

  const sentenceCase = (text) => {
    if (text.length === 0) return text;
    const firstLetter = text[0].toString().toUpperCase();
    const rest = text.substring(1).toLowerCase();
    const ans = firstLetter + rest;
    return ans;
  };

  const handlePrint = () => {
    window.print();
  }

  const approver =
    data.employee.id === data.project.projectManager.id
      ? "Admin"
      : data.project.projectManager.firstName +
        " " +
        data.project.projectManager.lastName;

  const attachmentId =
    data.attachments.length > 0 ? data.attachments[0].id : -1;

  const showBill = () => {
    attachmentsService
      .downloadDoc(attachmentId)
      .then((response) => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch(() => {
        alert("Could Not Download!");
      });
  };
  return (
    <Modal onHide={props.onHide} show={props.show} size="xl" backdrop="static">
      {" "}
      {/* fullscreen = {true} */}
      <Modal.Header closeButton>
        <Modal.Title>Expense Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body id="printModal">
        <div>
          <Row className="align-items-center">
            <Col xs={3} type="wide-col d-flex justify-content-center">
              <center>
                <h3>
                  <i className="bi bi-person" type="employee-icon"></i> Employee
                  Name
                </h3>
              </center>
            </Col>
            <Col xs={3} type="wide-col">
              <center>
                <h3>
                  <i className="bi bi-calendar2-event" type="employee-icon"></i>{" "}
                  Entry Date
                </h3>
              </center>
            </Col>
            <Col xs={3} type="wide-col">
              <center>
                <h3>
                  <i className="bi bi-cash" type="employee-icon"></i> Total
                  Reimbursement
                </h3>
              </center>
            </Col>
            <Col xs={3} type="wide-col">
              <center>
                <h3>
                  <i className="bi bi-grid" type="employee-icon"></i> Status
                </h3>
              </center>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col xs={3} type="wide-col">
              <center>
                {data.employee.firstName + " " + data.employee.lastName}
              </center>
            </Col>
            <Col xs={3} type="wide-col">
              <center>{data.date}</center>
            </Col>
            <Col xs={3} type="wide-col">
              <center>
                {data.currency +
                  " " +
                  Number(Number(data.amount) + Number(data.tax)).toFixed(2)}
              </center>
            </Col>
            <Col xs={3} type="wide-col">
              <center>
                <Badge bg="info" as="div">
                  {sentenceCase(data.status)}
                </Badge>
              </center>
            </Col>
          </Row>
        </div>

        <br />

        <Table responsive bordered hover>
          <thead>
            <tr>
              <th width="100">
                <center>Date</center>
              </th>
              <th>
                <center>Project Name</center>
              </th>
              <th>
                <center>Expense Name</center>
              </th>
              <th>
                <center>Description</center>
              </th>
              <th>
                <center>Payment Method</center>
              </th>
              <th>
                <center>Tax Zone</center>
              </th>
              <th>
                <center>Amount</center>
              </th>
              <th>
                <center>Tax</center>
              </th>
              <th>
                <center>Net Amount</center>
              </th>
              <th>
                <center>Approver</center>
              </th>
              <th>
                <center>Billable</center>
              </th>
              <th></th>
              <th>
                <center>
                  <i className="bi bi-paperclip"></i>
                </center>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <center>{data.date}</center>
              </td>
              <td>
                <center>{data.project.projectName}</center>
              </td>
              <td>
                <center>{data.name}</center>
              </td>
              <td>
                <center>{data.description}</center>
              </td>
              <td>
                <center>{sentenceCase(data.paymentMethod)}</center>
              </td>
              <td>
                <center>{data.taxZone}</center>
              </td>
              <td>
                <center>{Number(data.amount).toFixed(2)}</center>
              </td>
              <td>
                <center>{Number(data.tax).toFixed(2)}</center>
              </td>
              <td>
                <center>
                  {data.currency +
                    " " +
                    Number(Number(data.amount) + Number(data.tax)).toFixed(2)}
                </center>
              </td>
              <td>
                <center>{approver}</center>
              </td>
              <td>
                <center>{data.billable ? "Yes" : "No"}</center>
              </td>
              <td>
                <center>
                  <Badge bg="info">{sentenceCase(data.status)}</Badge>
                </center>
              </td>
              <td>
                <center>
                  <Button variant="outline-primary" onClick={showBill}>
                    <i className="bi bi-paperclip"></i>
                  </Button>
                </center>
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handlePrint}>
          Print
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewExpense;
