import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CONTAINER from "./Confirm.styled";

const Confirm = () => {
  return (
  <CONTAINER>
    <Row className="justify-content-center">
      <Col md={5}>
        <Card
          bg="secondary"
          text="light"
          className="p-3 mt-5"
        >
          <Card.Body>
            Registration successful. Please <Link to="/login">Sign In</Link>
            <p>
              to access your account.
            </p>
          </Card.Body>
        </Card>
      </Col>  
    </Row>      
  </CONTAINER>
)
}

export default Confirm;
