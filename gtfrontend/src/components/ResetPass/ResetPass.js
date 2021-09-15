import React, { useState } from 'react';
import { Button, Col, Row, Card, Form, FloatingLabel, FormControl, Modal } from 'react-bootstrap';
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

  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <CONTAINER fluid="sm">
      <Modal
        show={show}
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Success!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Password reset successfully, please Sign in to access your account.
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
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
                        {/* Email input */}
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
                      {/* Password input */}
                    <Form.Group>
                    <FloatingLabel
                      controlId="password"
                      label="Password"
                    >
                      <Form.Control 
                        type="password"
                        name="password"
                        placeholder="password"
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={errors.password}
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.password}
                      </FormControl.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  {/* PASSWORD CONFIRMATION */}
                  <Form.Group className="my-3">
                    <FloatingLabel
                      controlId="password_confirmation"
                      label="Confirm password"
                    >
                      <Form.Control 
                        type="password"
                        name="password_confirmation"
                        placeholder="password"
                        value={values.password_confirmation}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isInvalid={errors.password_confirmation}
                      />
                      <FormControl.Feedback type="invalid">
                        {errors.password_confirmation}
                      </FormControl.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="my-3">
                      <Button
                        type="submit"
                        variant="warning"
                        size="lg"
                        disabled={isLoading}
                        >
                        {!isLoading ? 'Submit' : 'Loading...'}
                      </Button>
                      <Button onCLick={()=> setShow(true)} variant="primary" disabled={isLoading}>Close</Button>
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
