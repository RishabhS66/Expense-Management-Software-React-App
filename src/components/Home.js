import React from "react";
import { useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Navbar, Card, Badge, Col, Row, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProjects } from "../actions/project";
import { getExpenseSheets } from "../actions/expense.actions";

const Home = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(getExpenseSheets())
      .then(() => {
        // console.log("Expenses fetched successfully");
        return;
      })
      .catch(() => {
        alert("Unable to fetch Expenses");
      });
  }, [dispatch]);

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
  const { projects: content } = useSelector((state) => state.project);
  const { entries: expContent } = useSelector((state) => state.expenseSheets);
  const projectData = content.map((prj) => {
    const ActiveStatus = prj.active ? "Active" : "Inactive";
    const BadgeType = ActiveStatus === "Active" ? "success" : "danger";
    const statusType = {
      TO_DO: "To-Do",
      IN_PROGRESS: "In Progress",
      COMPLETED: "Completed",
      SUSPENDED: "Suspended",
    };
    const soonDue = prj.soonDue ? (
      <center>
        <Badge bg="info">Soon Due</Badge>
      </center>
    ) : (
      ""
    );
    const prjData = {
      projectActiveStatus: (
        <center>
          <Badge bg={BadgeType}>{ActiveStatus}</Badge>
        </center>
      ),
      projectDueStatus: soonDue,
      pName: prj.projectName,
      projectStatus: statusType[prj.status],
    };
    return prjData;
  });

  function getSum(total, num) {
    return total + num;
  }
  
  const totalAmount = expContent.map((entry) => entry.amount + entry.tax).reduce(getSum, 0);
  const totalReimbursed = expContent
    .filter((e) => e.status === "APPROVED")
    .map((entry) => entry.amount + entry.tax)
    .reduce(getSum, 0);

  const columns = [
    {
      dataField: "projectActiveStatus",
      text: "",
      headerStyle: (colum, colIndex) => {
        return { width: "7rem", textAlign: "center" };
      },
    },
    {
      dataField: "projectDueStatus",
      text: "",
      headerStyle: (colum, colIndex) => {
        return { width: "8rem", textAlign: "center" };
      },
    },
    {
      dataField: "pName",
      text: "Project Name",
      sort: true,
      sortCaret: SortCaret,
    },
    {
      dataField: "projectStatus",
      text: "Status",
      sort: true,
      sortCaret: SortCaret,
    },
  ];

  const defaultSorted = [
    {
      dataField: "projectCode",
      order: "asc", //desc
    },
  ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      &nbsp; Showing {from} to {to} of {size} Results
    </span>
  );

  const options = {
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: projectData.length,
      },
    ],
  };

  const { SearchBar } = Search;

  return (
    <>
      <Navbar expand="lg" bg="light">
        <Navbar.Text>
          &nbsp; <strong>Dashboard</strong>
        </Navbar.Text>
      </Navbar>
      <br />
      <Row id="myProjects">
        <Col sm={8}>
          <Card style={{ width: "95%" }} className="ms-5">
            <Card.Header as="h4">MY PROJECTS</Card.Header>
            <Card.Body>
              <ToolkitProvider
                keyField="pName"
                data={projectData}
                columns={columns}
                search
              >
                {(props) => (
                  <div>
                    <SearchBar
                      {...props.searchProps}
                      srText="Search Projects :"
                      placeholder="Enter text"
                    />
                    <br />
                    <BootstrapTable
                      {...props.baseProps}
                      hover
                      defaultSorted={defaultSorted}
                      pagination={paginationFactory(options)}
                      noDataIndication="No data available in table"
                    />
                  </div>
                )}
              </ToolkitProvider>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "90%" }} className="ms-2">
            <Card.Header as="h4">MY EXPENSE SUMMARY</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Card.Text>
                    <i className="bi bi-cash"></i> Total Expenses Amount
                  </Card.Text>
                  <h2>&nbsp;{"INR " + Number(totalAmount).toFixed(2)}</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Card.Text>
                    <i className="bi bi-wallet"></i> Total Reimbursed Amount{" "}
                  </Card.Text>
                  <h2>&nbsp;{"INR " + Number(totalReimbursed).toFixed(2)}</h2>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Home;
