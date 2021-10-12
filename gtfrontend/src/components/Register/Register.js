import React, { useState } from 'react';
// Yup - JS schema builder for validation and value parsing
import * as Yup from 'yup';
import axios from 'axios';
// formik - open source form library for React
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { CONTAINER, MODAL } from './Register.styled';
import { Row, Col, Card, Button, Modal, FloatingLabel, Form, FormControl } from 'react-bootstrap';
import { default as Banner } from '../Banner';

const Register = () => {
  // Submit button state, display message for user while performing a request
  const [isLoading, setIsLoading] = useState(false);
  // Modal state
  const [show, setShow] = useState(false);
  // Yup validation rules
  const validator =  Yup.object({
    first_name: Yup.string().required('First name required'),
    last_name: Yup.string().required('Last name required'),
    email: Yup.string().email('Invalid email address').required('Email required'),
    password: Yup.string().required('Password required').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
    "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
    password_confirmation: Yup.string().required('Password confirmation required').oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true)
    try {
      await axios.post('http://localhost:8000/api/register', values).then(response => {
        return response.json();
      });
      setIsLoading(false);
      setShow(true);
    } catch (error) {
      setIsLoading(false)
    }    
  };

  return(
    <>
    <Banner />
    <CONTAINER fluid="sm">
      <MODAL 
        show={show}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            Success!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Registration successful. Please Sign In
              to access your account.
        </Modal.Body>
        <Modal.Footer >
          <Link to="/login" className="mx-auto">
            <Button variant="warning" >Sign In</Button>
          </Link>
        </Modal.Footer>
      </MODAL>
      <Row className="justify-content-center">
        <Col md={7}>
          <Card>
            <Card.Header className="py-3">
              <Card.Title>Sign Up</Card.Title>
            </Card.Header>
            <Card.Body>
            {/* Start of Formik form */}
            <Formik
              validationSchema={validator}
              onSubmit={handleSubmit}
              initialValues={{ 
                first_name:'',
                last_name:'',
                email:'',
                occupation:'',
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
                  <Row md={2}>
                      {/* FIRST NAME */}
                    <Form.Group as={Col}>
                      <FloatingLabel
                        controlId="first_name"
                        label="First name"
                      >
                        <Form.Control
                          type="text"
                          name="first_name"
                          placeholder="John"
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
                    {/* LAST NAME */}
                    <Form.Group as={Col}>
                      <FloatingLabel
                        controlId="last_name"
                        label="Last name"
                      >
                        <Form.Control
                          type="text"
                          name="last_name"
                          placeholder="John"
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
                    {/* EMAIL */}
                    <Form.Group>
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
                    {/* OCCUPATION */}
                    <Form.Group>
                      <FloatingLabel
                        controlId="occupation"
                        label="Occupation"
                      >
                        <Form.Select
                          value={values.occupation}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          <option value="Oa / Support">OA / Support</option>
                          <option value="Dispensing Optician">Dispensing Optician</option>
                          <option value="Manager">Manager</option>
                          <option value="Optometrist">Optometrist</option>
                          <option value="Admin">Admin</option>
                          <option value="HC assistant">HC assistant</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  {/* PASSWORD */}
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
                  <Form.Group>
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
                        {!isLoading ? 'Sign Up' : 'Loading...'}
                      </Button>
                    </Form.Group>
                
                </Form>
              )}
            </Formik>
            </Card.Body>
            {/* FOOTER */}
            <Card.Footer className="py-3">
              <div className="d-flex justify-content-center links">
                 Already have an account?<Link to="/">Sign In</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </CONTAINER>
    </>
  );

}

export default Register;