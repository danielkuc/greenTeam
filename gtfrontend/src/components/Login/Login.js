import React from 'react'
import StyledLogin from './Login.styled';
import { useFormik } from "formik";
import axios from 'axios';

const Login = () => {
  const validate = values=> {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password required';
    } else if (values.password.length < 3) {
      errors.password = 'Must be at least 3 characters'
    }
    return errors;
  };


  const formik = useFormik({
    initialValues:{
      email:'',
      password: ''
    },
    validate,
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
      <h1 className="pb-3">Login</h1>
      <div className="container m-auto col-sm-4">
        <form onSubmit={formik.handleSubmit}>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="form-control my-2 "
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="form-control my-2 "
            />
          </div>
          
          <button type="submit" className="btn btn-primary">Log In</button>
        </form>
      </div>
    </StyledLogin>
  )
}

export default Login;
