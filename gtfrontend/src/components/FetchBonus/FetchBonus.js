import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik'
import { Accordion, Row, Col, FloatingLabel, Form, FormControl } from 'react-bootstrap';
import CONTAINER from './FetchBonus.styled';
import apiClient from '../../services/api';
import { SubmitButton } from '../../components';

const FetchBonus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  // Yup validator
  const validator = yup.object({
    date: yup.date(),
    date_from: yup.date(),
  });
// Method  to fetch data from DB
  const handleSUbmit = async (values) => {
    setIsLoading(true)
    try {
      await apiClient.post('request/bonus', values).then(response =>{
        setIsLoading(false);
        setData(response.data);
        setTimeout(() => {
          console.log(data);
        }, 300);
      })
    } catch (error) {
      console.log(error);      
      isLoading(false);
    }
  }

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
              onSubmit={handleSUbmit}
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={{ 
                date_from: '',
                date_to: '',
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
                  <Row md={2}>
                    {/* Search by date range  */}
                  <Form.Group as={Col}>
                      <FloatingLabel
                        controlId="date_from"
                        label="Date from"
                      >
                        <Form.Control
                          type="date"
                          name="date_from"
                          placeholder="Date to"
                          value={values.date_from}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={errors.date_from}
                        />
                        <FormControl.Feedback type="invalid">
                          {errors.date_from}
                        </FormControl.Feedback>
                      </FloatingLabel>  
                    </Form.Group> 

                    <Form.Group as={Col}>
                      <FloatingLabel
                        controlId="date_to"
                        label="Date to"
                      >
                        <Form.Control
                          type="date"
                          name="date_to"
                          placeholder="Date to"
                          value={values.date_to}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={errors.date_to}
                        />
                        <FormControl.Feedback type="invalid">
                          {errors.date_to}
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
