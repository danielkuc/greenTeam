import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Row, Col, Card, Button, Modal, FloatingLabel, Form, FormControl } from 'react-bootstrap';
import CONTAINER from './AddBonus.styled';
import apiClient from '../../services/api';

const AddBonus = () => {

  const validator = yup.object({
    cx_number: yup.number('Must be a number').positive('Must be positive').integer('Must be an Integer'),
    bonus_date: yup.date().required('Date required'),
    bogof: yup.number('Must be a number').positive('Must be positive').integer('Must be an Integer'),
    designer_frames: yup.number('Must be a number').positive('Must be positive').integer('Must be an Integer'),
    coatings: yup.number('Must be a number').positive('Must be positive').integer('Must be an Integer')
  });

  return (
    <>
      <CONTAINER fluid="md">
        <Row className="justify-content-center">
          <Col md={9} lg={8} xl={7}>
            <Card>
              <Card.Header>
                <Card.Title>Add new bonus entry</Card.Title>
              </Card.Header>    
            </Card>          
          </Col>
        </Row>
      </CONTAINER>
    </>
  )
}

export default AddBonus
