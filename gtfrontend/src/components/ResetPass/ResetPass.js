import React, { useState } from 'react';
import { Button, Col, Row, Card, Form, FloatingLabel, FormControl, Modal } from 'react-bootstrap';
import CONTAINER from './ResetPass.styled';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link, useLocation } from 'react-router-dom';
import apiClient from '../../services/api';

const ResetPass = () => {

  const search= useLocation().search;
  // extract token from forgot-password URL, do not remove or modify.
  const token = new URLSearchParams(search).get('token');

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
  
  const handleSubmit = async (values) => {
    setIsLoading(true);

    // extracted token and values are sent to back end for validation, do not remove or modify token
    const credentials = {
      ...values,
      'token': token
    } 
    try {
      await apiClient.get("/sanctum/csrf-cookie").then(response => {
        apiClient.post('reset-password', credentials).then(response => {
          if (response.status === 200) {
            setIsLoading(false)
            handleShow();
          }
        });
      });
    } catch (error) {
      console.log(error);      
    }
  }

  return (
    <>
    <CONTAINER fluid="sm">
      <Modal
        show={show}
        centered
        keyboard={false}
        onHide={handleClose}
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
          <Link to="/home">
            <Button
              variant="warning"
            >
              Sign In
            </Button>
          </Link>
          <Button
            onClick={handleClose}
          >
            Close
          </Button>
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
                onSubmit={handleSubmit}
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
                        {!isLoading ? 'Confirm password reset' : 'Loading...'}
                      </Button>
                    </Form.Group>

                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="py-3">
                <div className="d-flex justify-content-center">
                  Go back to <Link to="/login">Sign In</Link>
                </div>
            </Card.Footer> 
          </Card>
        </Col>
      </Row>
    </CONTAINER>
    </>
  )
}

export default ResetPass;
