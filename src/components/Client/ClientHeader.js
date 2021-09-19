import React from "react";
import { Navbar } from "react-bootstrap";

const ClientHeader = () => {
  return (
    <>
      <Navbar expand="lg" bg="light">
        <Navbar.Text>
          &nbsp; <strong>Dashboard : Clients</strong>
        </Navbar.Text>
      </Navbar>
    </>
  );
};

export default ClientHeader;
