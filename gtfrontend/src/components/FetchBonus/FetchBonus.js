import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik'
import { Accordion, Row, Col, FloatingLabel, Form, FormControl } from 'react-bootstrap';
import CONTAINER from './FetchBonus.styled';
import apiClient from '../../services/api';
import { SubmitButton } from '../../components';

const FetchBonus = () => {
  const [isLoading, setIsLoading] = useState(false);

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
          className="py-4"
        >
          <Accordion.Header>
            Search parameters
          </Accordion.Header>
          <Accordion.Body>
            <Formik
              validationSchema={validator}
              // onSubmit={handleSUbmit}
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={{ 
                username:'',
                date: 0
               }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors
              }) => (
                <Form
                  onSubmit={handleSubmit}
                >
                  <Row
                    md={2}
                  >
                    {/* search by username */}
                    <Form.Group as={Col}>
                      <FloatingLabel
                        controlId="username"
                        label="Filter by name"
                      >
                        <Form.Control
                          type="text"
                          name="username"
                          placeholder="Filter by name"
                          value={values.username}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={errors.username}
                        />
                        <FormControl.Feedback type="invalid">
                          {errors.username}
                        </FormControl.Feedback>
                      </FloatingLabel>  
                    </Form.Group> 
                    {/* search by date */}
                    <Form.Group as={Col}>
                      <FloatingLabel
                        controlId="date"
                        label="Filter by date"
                      >
                        <Form.Control
                          type="date"
                          name="date"
                          placeholder="Filter by date"
                          value={values.date}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={errors.date}
                        />
                        <FormControl.Feedback type="invalid">
                          {errors.date}
                        </FormControl.Feedback>
                      </FloatingLabel>  
                    </Form.Group>  
                  </Row>                  
                  <SubmitButton state={isLoading} />
                </Form>
              )}
            </Formik>
          </Accordion.Body>
        </Accordion>
      </CONTAINER>
    </>
  )
}

export default FetchBonus
