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
    <StyledLogin className="">
      <div className="wrapper m-auto col-sm-6 p-4">
      <div className="container">
      <h1 className="pb-3">Login</h1>
      <p>or <Link to="/register" label="Register">Register</Link>.</p>
        <form onSubmit={formik.handleSubmit}>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
                // shorthand for onBlur, onChange etc, spreads 
                {...formik.getFieldProps('email')}
              className="form-control my-2 "
            />
            {formik.touched.email && formik.errors.email ? (<div className="error">{formik.errors.email}</div>) : null}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              {...formik.getFieldProps('password')}
              className="form-control my-2 "
            />
            {formik.touched.password && formik.errors.password ? (<p className="error">{formik.errors.password}</p>) : null}
          </div>
          
          <button type="submit" className="btn btn-warning px-4 py-1 w-100">Log In</button>
        </form>
      </div>
      </div>
    </StyledLogin>
  )
}

export default Login;
