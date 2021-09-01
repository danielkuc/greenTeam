import React from 'react'
import StyledLogin from './Login.styled';
import { useFormik } from "formik";
// Yup - JS schema builder for validation and value parsing
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  // initializing formik: passing state and submit.
  const formik = useFormik({
    initialValues:{
      email:'',
      password: ''
    },
    // validation done by Yup and passed to formik as an object
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email required'),
      password: Yup.string().required('Password required'),
    }),
    // event fired off on submit of a form
    onSubmit: async values => {
      console.log(values);

      try {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie", {withCredentials:true}).then(response => {
          console.log(response);
          axios.post("http://localhost:8000/api/login", values)
          .then(response => {
            console.log(response);
          })
        })
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <StyledLogin>
      <div className="container m-auto col-sm-4">
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
            {formik.touched.password && formik.errors.password ? (<div className="error">{formik.errors.password}</div>) : null}
          </div>
          
          <button type="submit" className="btn btn-primary">Log In</button>
        </form>
      </div>
    </StyledLogin>
  )
}

export default Login;
