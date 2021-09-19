
import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

export default class ProjectSummaryHeader extends Component {
  render() {
    return (
      <div>
        <Navbar expand="lg" bg="light">
          <Navbar.Text>
            &nbsp; <strong>
              Dashboard : Projects : Project Summary
              </strong>
          </Navbar.Text>
        </Navbar>
      </div>
    );
  }
}
