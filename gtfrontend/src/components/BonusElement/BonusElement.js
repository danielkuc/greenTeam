import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';

const BonusElement = ({ date_from, date_to, bogof, designer_frames, coatings, cx_number }) => {
  return (
    <>
      <Row>
        <Col>
          <Container>
            <Card>
              <Card.Header className="d-inline-flex justify-content-between">
                Bonus from: 2021-11-01 | To:  2021-11-03
                <div>
                  <XCircle size={20}/>
                </div>
              </Card.Header>
              <Card.Body className="d-flex justify-content-between">
                <span className="h5">Cx number: 456654</span><span>2-4-1: 5  |  Coatings: 8  |  Designer Frames: 5</span><span>Colleague: John Doe</span>
              </Card.Body>
            </Card>
          </Container>
        </Col>
      </Row>
    </>
  )
}

export default BonusElement
