import React from 'react';
// formik - open source form library for React
import { useFormik } from 'formik';
import StyledRegister from './Register.styled';
// Yup - JS schema builder for validation and value parsing
import * as Yup from 'yup';
import axios from 'axios';

const Register = () => {
  // initializing formik: passing state and submit.
  const formik = useFormik({
    initialValues:{
      first_name:'',
      last_name:'',
      email:'',
      occupation:'Choose your occupation',
      password:'',
      password_confirmation:''
    },
    // validation done by Yup and passed to formik as an object
    validationSchema: Yup.object({
      first_name: Yup.string().required('First name required'),
      last_name: Yup.string().required('Last name required'),
      email: Yup.string().email('Invalid email address').required('Email required'),
      password: Yup.string().required('Password required'),
      password_confirmation: Yup.string().required('Password confirmation required'),
    }),
    // event fired off on submit of a form
    onSubmit: async values => {
      console.log(JSON.stringify(values,null,2));
      console.log(...formik.getFieldProps('first_name'));

      try {
        await axios.post('http://localhost:8000/api/login', values).then(response => {
          console.log(response);
        });
      } catch (error) {
        console.log(error);
      }
    }
  });



  return (
    <StyledRegister className="pt-3">
      <div className="wrapper m-auto col-sm-6 p-4 ">
        <div className="container m-auto">
        <h1 className="pb-3">Register</h1>
          <form onSubmit={formik.handleSubmit}>
            
            <div className="form-group">
              <label htmlFor="first_name">First Name:</label>
              <input 
                type="text" 
                id="first_name"
                // shorthand for onBlur, onChange etc, spreads 
                {...formik.getFieldProps('first_name')}
                className="form-control my-2 "
              />
              {formik.touched.first_name && formik.errors.first_name ? (<div className="error">{formik.errors.first_name}</div>) : null}
            </div>
            
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input 
                type="text" 
                id="last_name"
                {...formik.getFieldProps('last_name')}
                className="form-control my-2 "
              />
              {formik.touched.last_name && formik.errors.last_name ? (<div className="error">{formik.errors.last_name}</div>) : null}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email"
                {...formik.getFieldProps('email')}
                className="form-control my-2 "
              />
              {formik.touched.email && formik.errors.email ? (<div className="error">{formik.errors.email}</div>) : null}
            </div>
            
            <div className="form-group">
              <label htmlFor="occupation">Occupation</label>
                <select 
                  id="occupation" 
                  {...formik.getFieldProps('occupation')}
                  className="form-select"
                  >
                  <option disabled hidden >Choose your occupation</option>
                  <option value="Oa / Support">OA / Support</option>
                  <option value="Dispensing Optician">Dispensing Optician</option>
                  <option value="Manager">Manager</option>
                  <option value="Optometrist">Optometrist</option>
                  <option value="Admin">Admin</option>
                  <option value="HC assistant">HC assistant</option>
                </select> 
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
            
            <div className="form-group">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input 
                type="password" 
                id="password_confirmation"
                {...formik.getFieldProps('password_confirmation')}
                className="form-control my-2"
              />
              {formik.touched.password_confirmation && formik.errors.password_confirmation ? (<div className="error">{formik.errors.password_confirmation}</div>) : null}
            </div>
            
            <button type="submit" className="btn btn-warning px-4 py-1 w-100">Register</button>
          </form>
        </div>
      </div>
    </StyledRegister>
  )
}

export default Register;
