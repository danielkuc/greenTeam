import React from 'react';
import { Col, Row, Card, Form, FloatingLabel, FormControl } from 'react-bootstrap';
import CONTAINER from './ResetPass.styled';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const ResetPass = () => {
  const validator = yup.object({
    email: yup.string().email('Invalid email address').required('Email required'),

    password: yup.string().required('Password required').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
    "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),

    password_confirmation: yup.string().required('Password confirmation required').oneOf([yup.ref("password"), null], "Passwords must match"),
  });


  return (
    <CONTAINER fluid="sm">
      <Row className="justify-content-center">
        <Col md={5}>
          <Card>
            <Card.Header>
              <Card.Title>
                Password reset
              </Card.Title>  
            </Card.Header>
            <Card.Body>
              <Formik
                validationSchema={validator}
                // onSubmit={}
                initialValues={{ 
                  email:'',
                  password:'',
                  password_confirmation:''
                 }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors
                  
                })=>(
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="my-3">
                      <FloatingLabel
                        controlId="email"
                        label="Email address"
                      >
                        <Form.Control 
                          type="email"
                          name="email"
                          placeholder="email@example.com"
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={errors.email}
                        />
                        <FormControl.Feedback type="invalid">
                          {errors.email}
                        </FormControl.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="my-3">
                      
                    </Form.Group>
                  </Form>
                )}
              </Formik>
            </Card.Body> 
          </Card>
        </Col>
      </Row>
    </CONTAINER>
  )
}

export default ResetPass;
