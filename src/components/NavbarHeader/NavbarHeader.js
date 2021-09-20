import React from "react";
import { useSelector } from "react-redux";
import {
  Navbar,
  Nav,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const userName = " Hi, " + user.firstName;

  return (
    <div id="navbarHeader">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        &nbsp;&nbsp;
        <OverlayTrigger
          key="bottom"
          placement="bottom"
          overlay={<Tooltip id={`tooltip-bottom`}>Home</Tooltip>}
        >
          <Button variant="outline-secondary" as={Link} to="/home">
            <i className="bi bi-house-fill"></i>
          </Button>
        </OverlayTrigger>
        &nbsp;
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/clients">
              Clients
            </Nav.Link>
            <Nav.Link as={Link} to="/projects">
              Projects
            </Nav.Link>
            <Nav.Link as={Link} to="/expenseEntries">
              Expenses
            </Nav.Link>
            <Nav.Link as={Link} to="/approvals">
              Approvals
            </Nav.Link>
            <Nav.Link as={Link} to="/employees">
              Employees
            </Nav.Link>
          </Nav>
          <Nav>
            {user.role === "ADMIN" && (
              <NavDropdown
                title={
                  <>
                    <i className="bi bi-gear"></i> Admin Options
                  </>
                }
              >
                <NavDropdown.Item as={Link} to="/addemployee">
                  Add Employee
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <NavDropdown
              title={
                <>
                  <i
                    className="bi bi-person-circle"
                    style={{ color: "grey" }}
                  ></i>
                  {userName}
                </>
              }
              align="end"
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/changepwd">
                Change Password
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/logout">
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarHeader;
