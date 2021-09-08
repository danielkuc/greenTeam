import React from 'react'
import { CARD } from './Login.styled';
import { useFormik, Formik } from "formik";
// Form,
// Yup - JS schema builder for validation and value parsing
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Card, Col, Container, Row,Form, FloatingLabel, Button, FormControl } from 'react-bootstrap';

const Login = ({ setState }) => {

  // const data = {
  //   email:'',
  //   password: ''
  // };

  let history = useHistory();

  const validator = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email required'),
    password: Yup.string().required('Password required'),
  });

  const handleSubmit = async (values) => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {withCredentials:true}).then(async (response) => {
        await axios.post("http://localhost:8000/api/login", values).then(response => {
        const {user} = response.data;
        setState(prevState => ({
          isLoggedIn: true,
          details: user
        }));
        history.push("/");
      })
      });
    } catch (error) {
      const status = error.response;
      if (status) {
        Formik.setFieldError('password', `Invalid credentials or user not found`)
      }
    }
  };
  // 7430164417

  // // initializing formik: passing state and submit.
  // const formik = useFormik({
  //   initialValues:data,
  //   // validation done by Yup and passed to formik as an object
  //   validationSchema:validator,
  //   // event fired off on submit of a form
  //   onSubmit: handleSubmit
  // });

  return (
    // <StyledLogin className="container mt-5">
    //   <div className="d-flex justify-content-center bob">
    //     <div className="card">

    //       <div className="card-header">
    //         <p className="h3">Sign In</p>
    //       </div>

    //         {/* <p>or <Link to="/register" label="Register">Register</Link>.</p> */}
    //         <div className="card-body">
    //           <form onSubmit={formik.handleSubmit}>

    //             <div className="input-group form-group">
    //               <div className="input-group-prepend">
    //                 <span className="input-group-text"><i className="fas fa-user"></i></span>
    //               </div>

    //               <input 
    //                 type="email" 
    //                 id="email"
    //                   // shorthand for onBlur, onChange etc, spreads 
    //                   {...formik.getFieldProps('email')}
    //                   className="form-control"
    //                   placeholder="Email"
    //               />
    //             </div>
    //               {formik.touched.email && formik.errors.email ? (<div className="error">{formik.errors.email}</div>) : null}
                
    //             <div className="input-group form-group">
    //               <div className="input-group-prepend">
    //                 <span className="input-group-text"><i className="fas fa-key"></i></span>
    //               </div>

    //               <input 
    //                 type="password" 
    //                 id="password"
    //                 {...formik.getFieldProps('password')}
    //                 className="form-control"
    //                 placeholder="Password"
    //               />
    //             </div>
    //               {formik.touched.password && formik.errors.password ? (<p className="error">{formik.errors.password}</p>) : null}
    //             <div className="form-group pt-3">
    //               <button type="submit" className="btn float-right login_btn">Log In</button>
    //             </div>
    //           </form>
    //         </div>
            
    //         <div className="card-footer">
    //           <div className="d-flex justify-content-center links">
    //             Don't have an account?<Link to="/register">Sign Up</Link>
    //           </div>
    //           <div className="d-flex justify-content-center">
    //             <Link>Forgot your password?</Link>
    //           </div>
    //         </div>
    //   </div>
    //   </div>
    // </StyledLogin>
    <Container fluid="sm">
      <Row className="justify-content-center">
        <Col md={5}>
          <CARD>
            <Card.Header className="py-3">
              <Card.Title>Sign In</Card.Title>
            </Card.Header>
            <Card.Body>
          {/* EMAIL INPUT */}
          <Formik
            validationSchema={validator}
            onSubmit={() => console.log('success')}
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
                      onChange={handleChange}
                      isInvalid={errors.password}
                    />
                    <FormControl.Feedback type="invalid">
                      {errors.password}
                    </FormControl.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="my-3">
                  <Button
                    type="submit"
                    variant="warning"
                    size="lg"
                    >
                    Sign In
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
                <Link to="#">Forgot your password?</Link>
              </div>
            </Card.Footer>
          </CARD>
        </Col>
      </Row>
    </Container>
  )
}

export default Login;
