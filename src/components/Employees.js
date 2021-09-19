import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Badge, Container, Card, Col, Navbar, Row } from "react-bootstrap";
import { getEmployees } from "../actions/employees";

const Employees = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployees())
      .then(() => {
        // console.log("Employees fetched successfully");
        return;
      })
      .catch(() => {
        alert("Unable to fetch employees");
      });
  }, [dispatch]);
  const { employees } = useSelector((state) => state.employees);
  const empRole = {
    0: "Software Developer Engineer",
    1: "Project Manager",
    2: "Administrator",
  };

  const roleType = {
    0: "info",
    1: "success",
    2: "danger",
  };

  return (
    <>
      <Navbar expand="lg" bg="light">
        <Navbar.Text>
          &nbsp; <strong>Dashboard : List of Employees</strong>
        </Navbar.Text>
      </Navbar>
      <br />
      <Container className="mt-2 px-5">
        <br />
        <Row
          xs={1}
          md={3}
          className="g-4 mx-md-n5 text-center justify-content-center"
        >
          {employees.map((e) => {
            return (
              <Col key={e.id} className="px-md-5 align-center">
                <Card style={{ width: "18rem" }}>
                  <Card.Header>
                    <i className="bi bi-file-person"></i>
                    <strong>{" " + e.firstname + " " + e.lastname}</strong>
                  </Card.Header>

                  <Card.Body>
                    <Card.Text>
                      <strong>Email:</strong> {e.email}
                    </Card.Text>
                    <Card.Text>
                      <strong>Role:</strong>{" "}
                      <Badge pill bg={roleType[e.role]}>
                        {empRole[e.role]}
                      </Badge>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Employees;
