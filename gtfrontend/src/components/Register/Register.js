import React from 'react';
import { useFormik } from 'formik';
import StyledRegister from './Register.styled';


const Register = () => {
  // validation function - must return an object which
  // keys must be symmetrical to values/initialValues
  const validate = values =>{
    const errors = {};
    if (!values.first_name) {
      errors.first_name = 'Required';
    } else if (values.first_name.length < 3) {
      errors.first_name = 'Must be at least 3 characters'
    }
    return errors;
  };


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
    validate,
    onSubmit: values=> {
      console.log(JSON.stringify(values,null,2));
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
                name="first_name"
                id="first_name"
                onChange={formik.handleChange}
                value={formik.values.first_name} 
                className="form-control my-2 "
              />
              {formik.errors.first_name ? <div>{formik.errors.first_name}</div> : null}
            </div>
            
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input 
                type="text" 
                name="last_name"
                id="last_name"
                onChange={formik.handleChange}
                value={formik.values.last_name} 
                className="form-control my-2 "/>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email} 
                className="form-control my-2 "/>
            </div>
            
            <div className="form-group">
              <label htmlFor="occupation">Occupation</label>
                <select 
                  name="occupation" 
                  id="occupation" 
                  onChange={formik.handleChange} 
                  value={formik.values.occupation}
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
                name="password" 
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="form-control my-2 "/>
            </div>
            
            <div className="form-group">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input 
                type="password" 
                name="password_confirmation" 
                id="password_confirmation"
                onChange={formik.handleChange}
                value={formik.values.password_confirmation}
                className="form-control my-2 "/>
            </div>
            
            <button type="submit" className="btn btn-warning px-4 py-1 w-100">Register</button>
          </form>
        </div>
      </div>
    </StyledRegister>
  )
}

export default Register;
