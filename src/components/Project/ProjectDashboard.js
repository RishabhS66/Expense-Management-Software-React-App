import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Card, Button, Badge, Dropdown } from "react-bootstrap";
import AddProject from "./AddProject";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../actions/project";
import { getProjects } from "../../actions/project";

const ProjectDashboard = () => {
  const [show, setShow] = useState(false);
  const [method, setMethod] = useState("Add");
  const initProj = {
    projectName: "",
    projectDescription: "",
    client: "",
    projectManager: "",
    status: "To-Do",
    startDate: "",
    endDate: "",
    duration: 0.0,
    cost: 0.0,
    teamMembers: [],
    projectID: -2,
  };
  const [proj, setProj] = useState(initProj);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setProj(initProj);
    setMethod("Add");
  };

  const formDate = (date) => {
    let splitDate = date.split(" ");
    let newDate = splitDate[0];
    let splitDateList = newDate.split("-");
    splitDateList = splitDateList.reverse();
    const finalDate = splitDateList.join("-");
    return finalDate;
  };

  const handleSelect = (e) => {
    handleShow();

    const statusType = {
      TO_DO: "To-Do",
      IN_PROGRESS: "In Progress",
      COMPLETED: "Completed",
      SUSPENDED: "Suspended",
    };

    const index = content.findIndex(
      (o) => o.id.toString() === e.target.id.toString()
    );
    let dataGot = content[index];
    let toPass = {
      projectName: "",
      projectDescription: "",
      client: "",
      projectManager: "",
      status: "To-Do",
      startDate: "",
      endDate: "",
      duration: 0.0,
      cost: 0.0,
      teamMembers: [],
      projectID: -1,
    };
    toPass.projectName = dataGot.projectName;
    toPass.projectManager = dataGot.projectManager;
    toPass.projectDescription = dataGot.description;
    toPass.client = dataGot.client.id;
    toPass.projectManager = dataGot.projectManager.id;
    toPass.status = statusType[dataGot.status];
    toPass.startDate = formDate(dataGot.startDate);
    toPass.endDate = formDate(dataGot.endDate);
    toPass.teamMembers = dataGot.teamMembers;
    toPass.projectID = dataGot.id;
    setProj(toPass);
    setMethod("Edit");
  };

  const dispatch = useDispatch();

  const handleDelete = (e) => {
    dispatch(deleteProject(e.target.id))
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
        alert("Could not delete project!!");
      });
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

  const { projects: content } = useSelector((state) => state.project);

  const dropDown = (id) => {
    const idUrl = "/projectsummary/" + id;
    return (
      <Dropdown>
        <Dropdown.Toggle id="options-menu" variant="secondary">
          <i className="bi bi-gear-fill"></i> Options
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark">
          <Dropdown.Item as={Link} to={idUrl}>
            View Summary
          </Dropdown.Item>
          <Dropdown.Item onClick={handleSelect} id={id}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDelete} id={id} disabled>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  const projectData = content.map((prj) => {
    const ActiveStatus = prj.active ? "Active" : "Inactive";
    const BadgeType = ActiveStatus === "Active" ? "success" : "danger";
    const statusType = {
      TO_DO: "To-Do",
      IN_PROGRESS: "In Progress",
      COMPLETED: "Completed",
      SUSPENDED: "Suspended",
    };
    const soonDue = prj.soonDue ? <center><Badge bg="info">Soon Due</Badge></center> : "";
    const prjData = {
      projectActiveStatus: <center><Badge bg={BadgeType}>{ActiveStatus}</Badge></center>,
      projectDueStatus: soonDue,
      projectCode: prj.id,
      pName: prj.projectName,
      cName: prj.client.fullName,
      projectStatus: statusType[prj.status],
      projectTeam:
        prj.projectManager.firstName + " " + prj.projectManager.lastName,
      projectOptions: <center>{dropDown(prj.id)}</center>,
    };
    return prjData;
  });

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
      dataField: "projectCode",
      text: "Code",
      sort: true,
      sortCaret: SortCaret,

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
      dataField: "cName",
      text: "Client Name",
      sort: true,
      sortCaret: SortCaret,
    },
    {
      dataField: "projectStatus",
      text: "Status",
      sort: true,
      sortCaret: SortCaret,
    },
    {
      dataField: "projectTeam",
      text: "Team",
      sort: true,
      sortCaret: SortCaret,
    },
    {
      dataField: "projectOptions",
      text: "",

      headerStyle: (colum, colIndex) => {
        return { width: "140px", textAlign: "center" };
      },
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
    // paginationSize: 4,
    // pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    // firstPageText: 'First',
    // prePageText: 'Back',
    // nextPageText: 'Next',
    // lastPageText: 'Last',
    // nextPageTitle: 'First page',
    // prePageTitle: 'Pre page',
    // firstPageTitle: 'Next page',
    // lastPageTitle: 'Last page',
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
    <Card className="ms-5" style={{ width: "95%" }}>
      <Card.Header as="h4">
        PROJECTS
        <Button
          variant="success"
          className="float-end"
          id="addProject"
          onClick={handleShow}
        >
          + Add Project
        </Button>
        {/* <Card.Text className="float-end">&nbsp;</Card.Text> */}
        {/* <Button
            variant="danger"
            className="float-end"
            id="deleteProjects"
            disabled={true}
          >
            Delete Selected
          </Button> */}
      </Card.Header>
      <Card.Body>
        <ToolkitProvider
          keyField="projectCode"
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
                // selectRow={{ mode: "checkbox" }}
                defaultSorted={defaultSorted}
                pagination={paginationFactory(options)}
                noDataIndication="No data available in table"
              />
            </div>
          )}
        </ToolkitProvider>
      </Card.Body>
      <AddProject
        show={show}
        onHide={handleClose}
        data={proj}
        method={method}
      />
    </Card>
  );
};

export default ProjectDashboard;
