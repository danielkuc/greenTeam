import React, { useState } from 'react';
import { Button, Card, Col, Form, Row, FloatingLabel, FormControl } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { Formik } from 'formik';
import * as yup from 'yup'
import CONTAINER from './ForgotPass.styled';
import axios from 'axios';

const ForgotPass = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const validator = yup.object({
    email: yup.string().email('Invalid email address').required('Email required')
  });

  const handleSubmit =  async (values) => {
    setIsLoading(true);
    try {
      await axios.post('http://localhost:8000/api/forgot-password', values);
      setIsLoading(false);
      setDisplay(true);
    } catch (error) {
      setIsLoading(false);      
    }
  }

  return (
    <CONTAINER fluid="sm">
      <Row className="justify-content-center">
        <Col md={5}>
          <Card>
            <CardHeader>
              <Card.Title>
                Forgot Password?
              </Card.Title>
            </CardHeader>
            <Card.Body>
              <Formik
                validationSchema={validator}
                onSubmit={handleSubmit}
                initialValues={{ 
                  email:''
                 }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
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

                    <Form.Group className={display ? `d-block` : `d-none`}>
                      <p className="popup">We've sent you a password reset link.</p>
                    </Form.Group>

                    <Form.Group className="my-3">
                      <Button
                        type="submit"
                        variant="warning"
                        size="lg"
                        disabled={isLoading}
                        >
                        {!isLoading ? 'Send Password Reset Link' : 'Loading...'}
                      </Button>
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

export default ForgotPass;
