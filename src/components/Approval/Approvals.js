import React from "react";
import { Card, Button, Col, ProgressBar } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import ApprovalHeader from "./ApprovalHeader";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  getSubmittedExpenses,
  updateExpenseState,
} from "../../actions/expense.actions";
import ViewExpense from "./ViewExpense";

const Approvals = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubmittedExpenses())
      .then(() => {
        // console.log("Got Submitted Expenses");
        return;
      })
      .catch(() => {
        // openToast();
        alert("Could Not Fetch Expenses Due For Approval");
      });
  }, [dispatch]);

  const viewButton = (id) => {
    return (
      <Button variant="secondary" onClick={handleShow} id={id}>
        View Details
      </Button>
    );
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

  const onApprove = (e) => {
    const payload = {
      status: "APPROVED",
    };
    dispatch(updateExpenseState(e.target.id, payload))
      .then(() => {
        dispatch(getSubmittedExpenses())
          .then(() => {
            // console.log("Approved, and expenses fetched successfully");
            return;
          })
          .catch(() => {
            alert("Unable to fetch expenses");
          });
      })
      .catch(() => {
        alert("Approval Failed!")
      });
  };

  const onReject = (e) => {
    const payload = {
      status: "REJECTED",
    };
    dispatch(updateExpenseState(e.target.id, payload))
      .then(() => {
        dispatch(getSubmittedExpenses())
          .then(() => {
            // console.log("Rejected, and expenses fetched successfully");
            return;
          })
          .catch(() => {
            alert("Unable to fetch expenses");
          });
      })
      .catch(() => {
        alert("Rejection Failed!")
      });
  };
  const initExp = {
    amount: 0,
    attachments: [],
    billable: true,
    currency: "INR",
    date: "",
    description: "",
    employee: { firstName: "", id: -1, lastName: "" },
    expenseId: -1,
    name: "",
    paymentMethod: "",
    project: {
      projectName: "",
      projectManager: { firstName: "", lastName: "" },
    },
    reimburseable: true,
    status: "SUBMITTED",
    tax: 0,
    taxZone: "IND",
  };
  const { expensesSubmitted: content } = useSelector(
    (state) => state.expenseByStatus
  );
  const { user } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const handleShow = (e) => {
    setShow(true);
    const index = content.findIndex(
      (o) => o.expenseId.toString() === e.target.id.toString()
    );
    setExpData(content[index]);
  };
  const handleClose = () => {
    setShow(false);
  };
  const [expData, setExpData] = useState(initExp);

  const approveButton = (id) => {
    return (
      <Button variant="success" onClick={onApprove} id={id}>
        Approve
      </Button>
    );
  };

  const rejectButton = (id) => {
    return (
      <Button variant="danger" onClick={onReject} id={id}>
        Reject
      </Button>
    );
  };

  const billableBar = (billable, amt) => {
    const billablePercent = (Number(billable) / Number(amt)) * 100.0;
    const nonBillablePercent = 100.0 - billablePercent;
    const nonBillable = Number(amt) - Number(billable);
    return (
      <>
        <ProgressBar>
          <ProgressBar
            variant="warning"
            now={billablePercent}
            label="Billable"
            key={1}
          />
          <ProgressBar
            variant="primary"
            now={nonBillablePercent}
            label="Non-Billable"
            key={2}
          />
        </ProgressBar>
        <strong>Billable:</strong> {Number(billable).toFixed(2)}{" "}
        <strong>Non-Billable:</strong> {Number(nonBillable).toFixed(2)}
      </>
    );
  };

  const expenseData = content
    .filter((exp) => exp.employee.id !== user.id)
    .map((exp) => {
      const expData = {
        expId: exp.expenseId,
        empName: exp.employee.firstName + " " + exp.employee.lastName,
        date: exp.date,
        amt: exp.currency + " " + Number(Number(exp.amount) + Number(exp.tax)).toFixed(2),
        bar: <center>{billableBar(Number(exp.amount)+Number(exp.tax), Number(exp.amount)+Number(exp.tax))}</center>,
        viewDetails: <center>{viewButton(exp.expenseId)}</center>,
        approve: <center>{approveButton(exp.expenseId)}</center>,
        reject: <center>{rejectButton(exp.expenseId)}</center>,
      };
      return expData;
    });

  const columns = [
    {
      dataField: "expId",
      text: "Expense ID",
      sort: true,
      sortCaret: SortCaret,
      // headerStyle: (colum, colIndex) => {
      //   return { width: "9rem" };
      // },
    },
    {
      dataField: "empName",
      text: "Employee Name",
      sort: true,
      sortCaret: SortCaret,
      // headerStyle: (colum, colIndex) => {
      //   return { width: "13rem" };
      // },
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
      sortCaret: SortCaret,
      // headerStyle: (colum, colIndex) => {
      //   return { width: "7rem" };
      // },
    },
    {
      dataField: "amt",
      text: "Amount",
      sort: true,
      sortCaret: SortCaret,
      // headerStyle: (colum, colIndex) => {
      //   return { width: "9rem" };
      // },
    },
    {
      dataField: "bar",
      text: "Billable/Non-Billable",
      headerStyle: (colum, colIndex) => {
        return { width: "25rem" };
      },
    },
    {
      dataField: "viewDetails",
      text: "",
      // headerStyle: (colum, colIndex) => {
      //   return { width: "8rem" };
      // },
    },
    {
      dataField: "approve",
      text: "",
      // headerStyle: (colum, colIndex) => {
      //   return { width: "7rem" };
      // },
    },
    {
      dataField: "reject",
      text: "",
      // headerStyle: (colum, colIndex) => {
      //   return { width: "7rem" };
      // },
    },
  ];

  const { SearchBar } = Search;

  return (
    <>
      <ApprovalHeader />
      <Card style={{ width: "95%" }} className="ms-5">
        <Card.Header as="h4">
          <Col>
            <div className="dark">EXPENSE APPROVAL</div>
          </Col>
        </Card.Header>
        <Card.Body>
          <ToolkitProvider
            keyField="expId"
            data={expenseData}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <SearchBar
                  id="searchbar"
                  {...props.searchProps}
                  srText="Search Expenses :"
                  placeholder="Enter text"
                />
                <br />
                <BootstrapTable
                  keyField="expId"
                  {...props.baseProps}
                  hover
                  pagination={paginationFactory()}
                  noDataIndication="No data available in the table for you"
                />
              </div>
            )}
          </ToolkitProvider>
        </Card.Body>
        <ViewExpense show={show} onHide={handleClose} data={expData} />
      </Card>
    </>
  );
};

export default Approvals;
