import React from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row } from "react-bootstrap";

const LogoutConfirmation = () => {
  return (
    <div>
      <br />
      <Container>
        <Row className="justify-content-center">
          <Card className="text-center" bg="warning" style={{ width: "20rem" }}>
            <Card.Body>
              <Card.Title>Logged out successfully!</Card.Title>
              <Card.Text>
                Click <Card.Link as={Link} to="/login">here</Card.Link> to go back to
                the login page!
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>

      <br />
    </div>
  );
};

export default LogoutConfirmation;
