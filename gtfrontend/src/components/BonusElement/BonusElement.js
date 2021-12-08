import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';

const BonusElement = ({bonus: {  bogof, designer_frames, coatings, cx_number, first_name, last_name }}) => {
  return (
    <>
      <Row className="my-3">
        <Col>
          <Container>
            <Card>
              <Card.Header className="d-inline-flex justify-content-between">
                {/* Bonus date: {bonus_date} */}
                <div>
                  <XCircle size={20}/>
                </div>
              </Card.Header>
              <Card.Body className="d-flex justify-content-between">
                <span className="h5">Cx number: {cx_number}</span><span>2-4-1: {bogof}  |  Coatings: {coatings}  |  Designer Frames: {designer_frames}</span><span>Colleague: {`${first_name} ${last_name}`}</span>
              </Card.Body>
            </Card>
          </Container>
        </Col>
      </Row>
    </>
  )
}

export default BonusElement
