import React, { useState } from 'react';
// formik - open source form library for React
import { Formik, useFormik } from 'formik';
import { CONTAINER } from './Register.styled';
// Yup - JS schema builder for validation and value parsing
import * as Yup from 'yup';
import { FloatingLabel, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik;
  // state and initial values for formik
  const data = {
    first_name:'',
    last_name:'',
    email:'',
    occupation:'Choose your occupation',
    password:'',
    password_confirmation:''
  };
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
    } catch (error) {
      if (error.response && error.response.status === 403) {
        formik.setFieldError('email', 'Email must be unique');
        setIsLoading(false)
      }
    }    
  };



  // initializing formik: passing state and submit.
  // const formik = useFormik({
  //   initialValues:data,
  //   validationSchema:validator ,
  //   onSubmit: handleSubmit
  // });


  return(
    <CONTAINER fluid="sm">
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
                ...data
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
                        <Form.Select>
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
                 Already have an account?<Link to="/login">Sign In</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </CONTAINER>
  );

}

export default Register;

    // <StyledRegister className="container mt-5">
    //   <div className="d-flex justify-content-center">
    //     <div className="card">
    //       <div className="card-header">
    //         <p className="h3">Register</p>
    //       </div>
    //     {/* <p>or <Link to="/login" label="Login">Sign In</Link> if you already have an account.</p> */}
    //       <div className="card-body">
    //         <form onSubmit={formik.handleSubmit}>
              
    //           <div className="input-group form-group">
    //             <div className="input-group-prepend">
    //               <span className="input-group-text"><i className="fas fa-user"></i></span>
    //             </div>
    //             <input 
    //               type="text" 
    //               id="first_name"
    //               // shorthand for onBlur, onChange etc, spreads 
    //               {...formik.getFieldProps('first_name')}
    //               className="form-control"
    //               placeholder="First Name"
    //             />
    //           </div>
    //             {formik.touched.first_name && formik.errors.first_name ? (<div className="error">{formik.errors.first_name}</div>) : null}
              
    //           <div className="input-group form-group">
    //             <div className="input-group-prepend">
    //               <span className="input-group-text"><i className="fas fa-user"></i></span>
    //             </div>
    //             <input 
    //               type="text" 
    //               id="last_name"
    //               {...formik.getFieldProps('last_name')}
    //               className="form-control"
    //               placeholder="Last Name"
    //             />
    //           </div>
    //             {formik.touched.last_name && formik.errors.last_name ? (<div className="error">{formik.errors.last_name}</div>) : null}
              
    //           <div className="input-group form-group">
    //             <div className="input-group-prepend">
    //               <span className="input-group-text"><i className="fas fa-user"></i></span>
    //             </div>
    //             <input 
    //               type="email" 
    //               id="email"
    //               {...formik.getFieldProps('email')}
    //               className="form-control"
    //               placeholder="Email"
    //             />
    //           </div>
    //             {formik.touched.email && formik.errors.email ? (<div className="error">{formik.errors.email}</div>) : null}
              
    //           <div className="input-group form-group">
    //             <div className="input-group-prepend">
    //               <span className="input-group-text"><i className="fas fa-user"></i></span>
    //             </div>
    //             <select 
    //                 id="occupation" 
    //                 {...formik.getFieldProps('occupation')}
    //                 className="form-select"
    //                 >
    //                 <option disabled hidden >Choose your occupation</option>
    //                 <option value="Oa / Support">OA / Support</option>
    //                 <option value="Dispensing Optician">Dispensing Optician</option>
    //                 <option value="Manager">Manager</option>
    //                 <option value="Optometrist">Optometrist</option>
    //                 <option value="Admin">Admin</option>
    //                 <option value="HC assistant">HC assistant</option>
    //               </select> 
    //           </div>

    //           <div className="input-group form-group">
    //             <div className="input-group-prepend">
    //               <span className="input-group-text"><i className="fas fa-user"></i></span>
    //             </div>
    //             <input 
    //               type="password" 
    //               id="password"
    //               {...formik.getFieldProps('password')}
    //               className="form-control"
    //               placeholder="Password"
    //             />
    //           </div>
    //             {formik.touched.password && formik.errors.password ? (<div className="error">{formik.errors.password}</div>) : null}
              
    //           <div className="input-group form-group">
    //             <div className="input-group-prepend">
    //               <span className="input-group-text"><i className="fas fa-user"></i></span>
    //             </div>
    //             <input 
    //               type="password" 
    //               id="password_confirmation"
    //               {...formik.getFieldProps('password_confirmation')}
    //               className="form-control"
    //               placeholder="Confirm Password"
    //             />
    //           </div>
    //             {formik.touched.password_confirmation && formik.errors.password_confirmation ? (<div className="error">{formik.errors.password_confirmation}</div>) : null}
              
    //           <button type="submit" className="btn register_btn">Register</button>

    //           <div className="card-footer">
    //             <div className="d-flex justify-content-center links">
    //               Already have an account? 
    //               <Link to="/register">Sign Up</Link>
    //             </div>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </StyledRegister>

