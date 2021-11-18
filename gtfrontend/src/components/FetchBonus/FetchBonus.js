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
    first_name: yup.string(),
    last_name: yup.string(),
    date: yup.date(),
    date_from: yup.date(),
    date_to: yup.date()
  });

  const handleSUbmit = async (values) => {
    setIsLoading(true)
    try {
      await apiClient.post('request/bonus', values).then(response =>{
        setIsLoading(false)
        return console.log(response);
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
                first_name:'',
                last_name:'',
                date: '',
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
                  <p className="py-1 h5">Search by name</p>
                  <Row md={2}>
                    {/* search by first name */}
                    <Form.Group as={Col}>
                      <FloatingLabel
                        controlId="first_name"
                        label="Filter by first name"
                      >
                        <Form.Control
                          type="text"
                          name="first_name"
                          placeholder="Filter by first name"
                          value={values.first_name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={errors.first_name}
                        />
                        <FormControl.Feedback type="invalid">
                          {errors.first_name}
                        </FormControl.Feedback>
                      </FloatingLabel>  
                    </Form.Group> 
                    {/* search by last name */}
                    <Form.Group as={Col}>
                      <FloatingLabel
                        controlId="last_name"
                        label="Filter by last name"
                      >
                        <Form.Control
                          type="text"
                          name="last_name"
                          placeholder="Filter by last name"
                          value={values.last_name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={errors.last_name}
                        />
                        <FormControl.Feedback type="invalid">
                          {errors.last_name}
                        </FormControl.Feedback>
                      </FloatingLabel>  
                    </Form.Group> 
                    </Row>
                    <p className="py-1 h5">Search by date range</p>
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
                  <p className="py-1 h5">Search by date</p>
                  <Row md={2}>
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
