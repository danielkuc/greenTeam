import React from 'react';
import CONTAINER from './Banner.styled'; 
import { Col, Row } from 'react-bootstrap';

const Banner = () => {
  return (
    <CONTAINER fluid className="mt-3 mb-5">
      <Row className="justify-content-center">
        <Col xs={4} className="py-3">
          <span>TheGreenTeam</span>
        </Col>
      </Row>
    </CONTAINER>
  )
}

export default Banner;
