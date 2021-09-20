import React from "react";
import AddExpenseEntry from "./AddExpenseEntry";
import { Card, Button, Badge, Dropdown, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Redirect } from "react-router";
import { Navbar, Modal } from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./Expense.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { deleteEntry } from "../../actions/expense.actions";
import { getExpenseSheets } from "../../actions/expense.actions";
import attachmentsService from "../../services/attachments.service";
// import { getProjects } from "../../actions/project";

const AddExpenseSheet = () => {
  const [show, setShow] = useState(false);
  const [del, setDel] = useState(false);
  const [delId, setDelId] = useState(-1);
  const [method, setMethod] = useState("Add");
  const showModal = () => {
    // console.log("working");
    setShow(true);
  };
  const hideModal = () => {
    // console.log("working");
    setShow(false);
    setEntry(initialEntry);
    setMethod("Add");
  };

  const showDel = () => {
    setDel(true);
  };
  const closeDel = () => {
    setDel(false);
  };

  const todayDate = () => {
    const date = new Date();
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  };

  const initialEntry = {
    projectName: "",
    name: "",
    paymentMethod: "CARD",
    currency: "INR",
    date: todayDate(),
    billable: "",
    reimburseable: "",
    netAmount: 0,
    taxZone: "IND",
    tax: 0,
    amount: 0,
    description: "",
    attachments: "",
    file: null,
  };

  const [entry, setEntry] = useState(initialEntry);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExpenseSheets())
      .then(() => {
        // console.log("Expenses fetched successfully");
        return;
      })
      .catch(() => {
        alert("Unable to fetch Expenses");
      });
  }, [dispatch, entry]);

  const { entries: content } = useSelector((state) => state.expenseSheets);

  const transformDate = (date) => {
    const splitDate = date.split("-");
    const newDateList = splitDate.reverse();
    const newDate = newDateList.join("-");

    return newDate;
  };

  const handleSelect = (e) => {
    showModal();
    const index = content.findIndex(
      (o) => o.expenseId.toString() === e.target.id.toString()
    );

    let dataGot = content[index];
    let toPass = {
      expenseId: "",
      projectName: "",
      name: "",
      paymentMethod: "CARD",
      currency: "INR",
      date: "",
      billable: "",
      reimburseable: "",
      netAmount: 0,
      taxZone: "IND",
      tax: 0,
      amount: 0,
      description: "",
      attachments: [],
    };
    toPass.expenseId = dataGot.expenseId;
    toPass.projectName = dataGot.project.id;
    toPass.name = dataGot.name;
    toPass.paymentMethod = dataGot.paymentMethod;
    toPass.currency = dataGot.currency;
    toPass.date = transformDate(dataGot.date);
    toPass.billable = dataGot.billable;
    toPass.reimburseable = dataGot.reimburseable;
    toPass.netAmount = dataGot.netAmount;
    toPass.taxZone = dataGot.taxZone;
    toPass.tax = dataGot.tax;
    toPass.amount = dataGot.amount;
    toPass.description = dataGot.description;
    toPass.attachments = dataGot.attachments;

    setEntry(toPass);
    // console.log(entry);
    setMethod("Edit");
  };

  const handleDelete = (e) => {
    // const payload = [Number(e.target.id)]
    closeDel();
    dispatch(deleteEntry(e.target.id))
      .then(() => {
        dispatch(getExpenseSheets())
          .then(() => {
            // console.log("Entries fetched successfully");
            return;
          })
          .catch(() => {
            alert("Unable to fetch entries");
          });
      })
      .catch(() => {
        alert("Could not delete entry!!");
      });
  };

  const confirmDelete = (e) => {
    showDel();
    setDelId(e.target.id);
  };

  const handleDownload = (e) => {
    attachmentsService
      .downloadDoc(e.target.id)
      .then((response) => {
        // console.log("Downloaded! ", response);
        //Create a Blob from the PDF Stream
        const file = new Blob([response], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch(() => {
        alert("Could Not Download!");
      });
  };

  const dropDown = (id, attachmentId, status) => {
    return (
      <Dropdown>
        <Dropdown.Toggle id="options-menu" variant="secondary" size="sm">
          <i className="bi bi-gear-fill"></i> Options
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark">
          <Dropdown.Item
            onClick={handleSelect}
            id={id}
            disabled={status !== "SUBMITTED"}
          >
            Edit Expense
          </Dropdown.Item>
          <Dropdown.Item
            onClick={handleDownload}
            id={attachmentId}
          >
            View Attachment
          </Dropdown.Item>
          <Dropdown.Item
            onClick={confirmDelete}
            id={id}
            disabled={status !== "SUBMITTED"}
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const { SearchBar } = Search;
  const afterSearch = (newResult) => {
    // console.log(newResult);
    return;
  };
  const SortCaret = (order, column) => {
    if (!order)
      return (
        <span className="float-end">
          <font color="grey">
            &nbsp;&nbsp;<i className="bi bi-caret-up-fill"></i>
            <i className="bi bi-caret-down-fill"></i>
          </font>
        </span>
      );
    else if (order === "asc")
      return (
        <span className="float-end">
          &nbsp;&nbsp;<i className="bi bi-caret-up-fill"></i>
          <font color="grey">
            <i className="bi bi-caret-down-fill"></i>
          </font>
        </span>
      );
    else if (order === "desc")
      return (
        <span className="float-end">
          &nbsp;&nbsp;
          <font color="grey">
            <i className="bi bi-caret-up-fill"></i>
          </font>
          <i className="bi bi-caret-down-fill"></i>
        </span>
      );
    return null;
  };

  const columns = [
    {
      dataField: "date",
      text: "Date",
      sort: true,
      // headerSortingStyle,
      sortCaret: SortCaret,
      headerStyle: (column, colIndex) => {
        return { width: "150px" };
      },
    },
    {
      dataField: "projectName",
      text: "Project Name",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "250px" };
      },
      // headerSortingStyle,
      sortCaret: SortCaret,
    },
    {
      dataField: "name",
      text: "Expense Name",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "250px" };
      },
      // headerSortingStyle,
      sortCaret: SortCaret,
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
      // headerSortingStyle,
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,

      sortCaret: SortCaret,
      // headerSortingStyle,
      headerStyle: (column, colIndex) => {
        return { width: "150px" };
      },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "150px" };
      },
      // headerSortingStyle,
      sortCaret: SortCaret,
    },
    {
      dataField: "options",
      text: "Options",
      headerStyle: (column, colIndex) => {
        return { width: "150px" };
      },
      // sort: true
    },
  ];

  const entryData = content.map((expense) => {
    var BadgeType = "secondary";
    if (expense.status === "SUBMITTED") {
      BadgeType = "info";
    } else if (expense.status === "APPROVED") {
      BadgeType = "success";
    } else if (expense.status === "REJECTED") {
      BadgeType = "danger";
    }
    const attachmentId =
      expense.attachments.length > 0 ? expense.attachments[0].id : -1;

    const expenseData = {
      date: expense.date,
      projectName: expense.project.projectName,
      name: expense.name,
      description: expense.description,
      amount: Number(Number(expense.amount) + Number(expense.tax)).toFixed(2),
      status: (
        <center>
          <Badge bg={BadgeType}>{expense.status}</Badge>
        </center>
      ),
      options: (
        <center>
          {dropDown(expense.expenseId, attachmentId, expense.status)}
        </center>
      ),
    };
    return expenseData;
  });

  function getSum(total, num) {
    return total + num;
  }

  const totalAmount = content
    .map((entry) => entry.amount + entry.tax)
    .reduce(getSum, 0);

  const totalReimbursed = content
    .filter((e) => e.status === "APPROVED")
    .map((entry) => entry.amount + entry.tax)
    .reduce(getSum, 0);

  const defaultSorted = [
    {
      dataField: "date",
      order: "desc", //desc and asc
    },
  ];

  const { user: currentUser } = useSelector((state) => state.auth);

  const employeeName = currentUser.firstName + " " + currentUser.lastName;

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Navbar expand="lg" bg="light">
        <Navbar.Text>
          &nbsp; <strong>Dashboard : Expenses</strong>
        </Navbar.Text>
      </Navbar>
      <br />
      <Card style={{ width: "95%" }} className="ms-5">
        <Card.Header as="h4">
          <Col>
            <div className="dark">
              EXPENSES
              <Button
                variant="success"
                // style={{ marginRight: 5 }}
                id="addExpenseEntry"
                onClick={showModal}
                className="float-end"
              >
                <i className="bi bi-plus"></i> Add Expense Entry
              </Button>
            </div>
          </Col>
        </Card.Header>
        <Card.Body>
          <div>
            <Row>
              <Col xs={4} type="wide-col">
                <Row>
                  {" "}
                  <div>
                    {" "}
                    <small>
                      {" "}
                      <i className="bi bi-person" type="employee-icon"></i>{" "}
                      Employee
                    </small>{" "}
                  </div>
                </Row>
                <Row>
                  <p className="display-6">{employeeName}</p>
                </Row>
              </Col>
              <Col xs={4} type="amount-col">
                <Row>
                  <div>
                    {" "}
                    <small>
                      <i className="bi bi-cash"></i> Total Expenses Amount
                    </small>{" "}
                  </div>
                </Row>
                <Row>
                  <h1 className="display-6">
                    INR {Number(totalAmount).toFixed(2)}
                  </h1>
                </Row>
              </Col>

              <Col xs={4} type="amount-col">
                <Row>
                  <div>
                    {" "}
                    <small>
                      <i className="bi bi-wallet"></i> Total Reimbursed Amount{" "}
                    </small>
                  </div>
                </Row>
                <Row>
                  <h1 className="display-6">
                    INR {Number(totalReimbursed).toFixed(2)}
                  </h1>
                </Row>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
      <br />
      <Card style={{ width: "95%" }} className="ms-5">
        <Card.Header as="h5">
          <div className="text-primary">EXPENSE ENTRY LIST</div>
        </Card.Header>
        <Card.Body>
          <ToolkitProvider
            keyField="description"
            data={entryData}
            columns={columns}
            search={{ afterSearch }}
          >
            {(props) => (
              <div>
                <SearchBar id="searchbar" {...props.searchProps} />
                <br />
                <BootstrapTable
                  keyField="id"
                  data={entryData}
                  columns={columns}
                  defaultSorted={defaultSorted}
                  headerClasses="header-class"
                  pagination={paginationFactory()}
                  {...props.baseProps}
                />
              </div>
            )}
          </ToolkitProvider>
        </Card.Body>
      </Card>
      <br />
      <Card style={{ width: "95%" }} className="ms-5">
        <Card.Body>
          {" "}
          <div>
            <Button variant="secondary" size="sm">
              Status Legend
            </Button>{" "}
            {/* <Button variant="warning" size="sm">Not Submitted</Button>{' '} */}
            <Button variant="info" size="sm">
              Submitted
            </Button>{" "}
            <Button variant="success" size="sm">
              Approved
            </Button>{" "}
            <Button variant="danger" size="sm">
              Rejected{" "}
            </Button>{" "}
          </div>
        </Card.Body>
        <AddExpenseEntry
          show={show}
          onHide={hideModal}
          data={entry}
          method={method}
        />
      </Card>
      <Modal show={del} onHide={closeDel} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this expense?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDelete} id={delId}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={closeDel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddExpenseSheet;
