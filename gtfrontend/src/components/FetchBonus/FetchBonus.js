import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik'
import { Accordion, Card, Row, Col,Button ,FloatingLabel, Form, FormControl } from 'react-bootstrap';
import CONTAINER from './FetchBonus.styled';
import apiClient from '../../services/api';

const FetchBonus = () => {
  const [isLodaing, setIsLoading] = useState(false);

  const validator = yup.object({
    username: yup.string(),
    date: yup.date()
  });

  // ADD DATE RANGE FROM-TO

  return (
    <>
      <CONTAINER>
        <Accordion
          defaultActiveKey="0"
        >
          <Accordion.Header>
            Search parameters
          </Accordion.Header>
          <Accordion.Body>
            <Formik
              validationSchema={validator}
              // onSubmit={handleSUbmit}
              initialValues={{ 
                username:'',
                date: null
               }}
            >

            </Formik>
          </Accordion.Body>
        </Accordion>
      </CONTAINER>
    </>
  )
}

export default FetchBonus
