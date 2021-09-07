import React from 'react'
import StyledLogin from './Login.styled';
import { useFormik } from "formik";
// Yup - JS schema builder for validation and value parsing
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Login = ({ setState }) => {
  const data = {
    email:'',
    password: ''
  };

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
        formik.setFieldError('password', `Invalid credentials or user not found`)
      }
    }
  };
  // 7430164417

  // initializing formik: passing state and submit.
  const formik = useFormik({
    initialValues:data,
    // validation done by Yup and passed to formik as an object
    validationSchema:validator,
    // event fired off on submit of a form
    onSubmit: handleSubmit
  });

  return (
    <StyledLogin className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="card">

          <div className="card-header">
            <p className="h3">Sign In</p>
          </div>

            {/* <p>or <Link to="/register" label="Register">Register</Link>.</p> */}
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>

                <div className="input-group form-group py-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                  </div>

                  <input 
                    type="email" 
                    id="email"
                      // shorthand for onBlur, onChange etc, spreads 
                      {...formik.getFieldProps('email')}
                      className="form-control"
                      placeholder="Email"
                  />
                </div>
                  {formik.touched.email && formik.errors.email ? (<div className="error">{formik.errors.email}</div>) : null}
                
                <div className="input-group form-group py-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                  </div>

                  <input 
                    type="password" 
                    id="password"
                    {...formik.getFieldProps('password')}
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                  {formik.touched.password && formik.errors.password ? (<p className="error">{formik.errors.password}</p>) : null}
                <div className="form-group">
                  <button type="submit" className="btn float-right login_btn">Log In</button>
                </div>
              </form>
            </div>
            
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?<Link to="/register">Sign Up</Link>
              </div>
              <div className="d-flex justify-content-center">
                <Link>Forgot your password?</Link>
              </div>
            </div>
      </div>
      </div>
    </StyledLogin>
  )
}

export default Login;
