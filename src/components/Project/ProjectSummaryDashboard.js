import React from "react";
import { Redirect } from "react-router-dom";
import {
  Card,
  Tab,
  Tabs,
  ListGroup,
  Row,
  Col,
  Table,
  Badge,
} from "react-bootstrap";
import "./ProjectSummaryDashboard.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProjectById, getProjectAmountById } from "../../actions/project";

const ProjectSummaryDashboard = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectById(props.id))
      .then(() => {
        // console.log("Project fetched successfully for summary");
        return;
      })
      .catch(() => {
        alert("Unable to fetch project for summary");
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProjectAmountById(props.id))
      .then(() => {
        // console.log("Project expenses fetched successfully for summary");
        return;
      })
      .catch(() => {
        alert("Unable to fetch project expenses for summary");
      });
  }, [dispatch]);

  const { project: content } = useSelector((state) => state.projectById);
  const { projectExpense: expense } = useSelector((state) => state.projectExpense);
  if (content.length === 0) {
    return <Redirect to={"/projectsummary/" + props.id} />;
  }
  if (expense.length === 0) {
    return <Redirect to={"/projectsummary/" + props.id} />;
  }
  const project = content[0];
  const statusType = {
    TO_DO: "To-Do",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    SUSPENDED: "Suspended",
  };

  const ActiveStatus = project.active ? "Active" : "Inactive";
  const BadgeType = ActiveStatus === "Active" ? "success" : "danger";
  const soonDue = project.soonDue ? <Badge bg="info">Soon Due</Badge> : "";

  return (
    <Row id="projectSummary">
      <Col sm={8}>
        <Card>
          <Card.Header as="h4">
            {project.client.fullName}
            <Card.Text className="float-end">
              <Badge bg={BadgeType}>{ActiveStatus}</Badge>
            </Card.Text>
            <Card.Text className="float-end">&nbsp;</Card.Text>
            <Card.Text className="float-end">{soonDue}</Card.Text>
            <br />
            <h1>
              <font color="blue">{project.projectName}</font>
            </h1>
            <h6>
              <i className="bi bi-calendar3"></i> Started On:{" "}
              {project.startDate.substring(0, 10)}
              &nbsp; &nbsp;
              <i className="bi bi-calendar3"></i> Due By:{" "}
              {project.endDate.substring(0, 10)}
              &nbsp; &nbsp;
              <i className="bi bi-card-list"></i> {statusType[project.status]}
            </h6>
          </Card.Header>
          <Card.Body>
            <Tabs defaultActiveKey="description">
              <Tab eventKey="description" title="Description">
                <br />
                {project.description}
              </Tab>

              <Tab eventKey="team" title="Team">
                <br />
                <strong>Team Members:</strong>
                <ul>
                  <li key="PM">
                    {project.projectManager.firstName +
                      " " +
                      project.projectManager.lastName}{" "}
                    <Badge pill bg="warning" text="dark">
                      Project Manager
                    </Badge>
                  </li>
                  {project.teamMembers
                    .filter((tm) => tm.id !== project.projectManager.id)
                    .map((tm) => {
                      return (
                        <li key={tm.id}>{tm.firstName + " " + tm.lastName}</li>
                      );
                    })}
                </ul>
              </Tab>

              {/* <Tab eventKey="attachment" title="Attachment">
                <br />
                <FileUpload />
              </Tab> */}
            </Tabs>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Header>
            <h3>
              <font color="blue">PROJECT SUMMARY</font>
            </h3>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Card.Text>
                  <strong>TOTAL HOURS</strong>
                </Card.Text>
                <h2>&nbsp;0.00</h2>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>Billable Hours</td>
                      <td className="float-end">0.00</td>
                    </tr>
                    <tr>
                      <td>Non - Billable Hours</td>
                      <td className="float-end">0.00</td>
                    </tr>
                  </tbody>
                </Table>
              </ListGroup.Item>

              <ListGroup.Item>
                <Card.Text>
                  <strong>TOTAL EXPENSES</strong>
                </Card.Text>
                <h2>&nbsp;{Number(expense.Total).toFixed(2)}</h2>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>Billable Expenses</td>
                      <td className="float-end">{Number(expense["Billable"]).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Non - Billable Expenses</td>
                      <td className="float-end">{Number(expense["Non-billable"]).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </Table>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProjectSummaryDashboard;
