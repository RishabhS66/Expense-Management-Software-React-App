import React from "react";
import { Nav } from "react-bootstrap";
import "./MainHeader.css";

const MainHeader = () => {
  return (
    <Nav className="navbar navbar-light justify-content-center" id="mainHeader">
      <h1>Expense Management System</h1>
    </Nav>
  );
};

export default MainHeader;
// <Nav className="navbar navbar-dark bg-dark text-white justify-content-center">
