import React, { useState } from 'react'
import { CARD } from './Login.styled';
import { Formik } from "formik";
// Form,
// Yup - JS schema builder for validation and value parsing
import * as Yup from 'yup';
import apiClient from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import { Card, Col, Container, Row,Form, FloatingLabel, Button, FormControl } from 'react-bootstrap';
import axios from 'axios';


// SETSTATE THROWING A UNMOUNTEND COMPONENT STATE ERROR, TO DO!!! CANCELL ALL SUBSCRIPTIONS AND ASSYNCS IN USEEFFECT CLEANUP
const Login = ({ setState }) => {
  const [serverError, setServerError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let history = useHistory();
  // validation schema using Yup
  const validator = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email required'),
    password: Yup.string().required('Password required'),
  });
  // handle submit function : gets csrf cookies from backend (need to be attached with any authorized requests and always withCredentials),
  // then takes validated user input sends to back end function to check if user is in database, then sets state with user info and redirects to home. if user not found throws formik error. 
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await apiClient.get("/sanctum/csrf-cookie").then( (request) => 
      {
        apiClient.post("/login",values).then(response => 
        { 
          console.log(response);
          const {user} = response.data;
          console.log(user);
          setState(prevState => ({
            isLoggedIn: true,
            details: user
          }));
          // history.push({
          //   pathname:'/',
          //   search:`?uid=${user.user_id}`
          // });
          history.push('/');
          setIsLoading(false);
          });
      });
    } catch (error) {
        setServerError(true);
        console.log(serverError);
    }
  };
  // 7430164417


  return (
    <Container fluid="sm">
      <Row className="justify-content-center">
        <Col md={5}>
          <CARD>
            <Card.Header className="py-3">
              <Card.Title>Sign In</Card.Title>
            </Card.Header>
            <Card.Body>
              {/* start of formik form */}
              <Formik
                validationSchema={validator}
                onSubmit={handleSubmit}
                // initial values / state of the form
                initialValues={{ 
                  email:'',
                  password:''
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
                }) =>(
                  <Form onSubmit={handleSubmit}>
                    {/* EMAIL INPUT */}
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
                    {/* PASSWORD INPUT */}
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
                    {/* Submit button */}
                    <Form.Group className="my-3">
                      <Button
                        type="submit"
                        variant="warning"
                        size="lg"
                        disabled={isLoading}
                        >
                        {!isLoading ? 'Sign In' : 'Loading...'}
                      </Button>
                    </Form.Group>
                  </Form>
              )}
              </Formik>
            </Card.Body>
            {/* FOOTER */}
            <Card.Footer className="py-3">
              <div className="d-flex justify-content-center links">
                 Don't have an account?<Link to="/register">Sign Up</Link>
              </div>
              <div className="d-flex justify-content-center">
                <Link to="/forgot-password">Forgot your password?</Link>
              </div>
            </Card.Footer>
          </CARD>
        </Col>
      </Row>
    </Container>
  )
}

export default Login;
