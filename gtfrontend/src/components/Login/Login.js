import React, { useState } from 'react'
import { CONTAINER } from '../Register/Register.styled';
import { Formik } from "formik";
// Form,
// Yup - JS schema builder for validation and value parsing
import * as Yup from 'yup';
import { useUserState, useLoginState } from '../../state';
import apiClient from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import { Card, Col, Row,Form, FloatingLabel, FormControl } from 'react-bootstrap';
import { SubmitButton } from '../../components';

const Login = () => {
  // access to state context, deconstructed.
  const { setUser } = useUserState();
  const { setIsLoggedIn } = useLoginState();


  const [serverError, setServerError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  // validation schema using Yup
  const validator = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email required'),
    password: Yup.string().required('Password required'),
  });
  // handle submit function : gets csrf cookies from backend (need to be attached with any authorized requests and always withCredentials),
  // then takes validated user input sends to back end function to check if user is in database, then sets state with user info and redirects to home. if user not found throws formik error. 
  const handleSubmit = async (values,{resetForm}) => {
    setIsLoading(true);
    try {
      await apiClient.get("/sanctum/csrf-cookie").then( response => 
      {
        apiClient.post("login",values).then(response => 
        { 
          setUser(response.data.user);
          setIsLoggedIn(true);
          setIsLoading(false);
          resetForm();
          history.push('/dashboard');
          });
      });
    } catch (error) {
        setServerError(true);
        console.log(serverError);
    }
  };

  return (
    <>
    <CONTAINER fluid="sm">
      <Row className="justify-content-center">
        <Col md={7} lg={6} xl={5}>
          <Card>
            <Card.Header className="py-3">
              <Card.Title>Sign In</Card.Title>
            </Card.Header>
            <Card.Body>
              {/* start of formik form */}
              <Formik
                validationSchema={validator}
                validateOnChange={false}
                validateOnBlur={false}
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
                    <SubmitButton state={isLoading} />
                  </Form>
              )}
              </Formik>
            </Card.Body>
            {/* FOOTER */}
            <Card.Footer className="py-3">
              <div className="d-flex justify-content-center links">
                 Don't have an account?<Link to="/home/register">Sign Up</Link>
              </div>
              <div className="d-flex justify-content-center">
                <Link to="/home/forgot-password">Forgot your password?</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </CONTAINER>
    </>
  )
}

export default Login;
