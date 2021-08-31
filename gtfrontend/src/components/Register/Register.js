import React from 'react';
import { useFormik } from 'formik';
import StyledRegister from './Register.styled';


const Register = () => {
  // validation function - must return an object which
  // keys must be symmetrical to values/initialValues
  const validate = values =>{
    const errors = {};
    if (!values.first_name) {
      errors.first_name = 'First name required';
    } else if (values.first_name.length < 3) {
      errors.first_name = 'Must be at least 3 characters'
    }
    
    if (!values.last_name) {
      errors.last_name = 'Last name required';
    } else if (values.last_name.length < 3) {
      errors.last_name = 'Must be at least 3 characters'
    }

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

    if (!values.password_confirmation) {
      errors.password_confirmation = 'Password required';
    } else if (values.password_confirmation.length < 3) {
      errors.password_confirmation = 'Must be at least 3 characters'
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
              {formik.errors.first_name ? <div className="error">{formik.errors.first_name}</div> : null}
            </div>
            
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input 
                type="text" 
                name="last_name"
                id="last_name"
                onChange={formik.handleChange}
                value={formik.values.last_name} 
                className="form-control my-2 "
              />
              {formik.errors.last_name ? <div className="error">{formik.errors.last_name}</div> : null}
            </div>
            
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
              {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
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
                className="form-control my-2 "
              />
              {formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
            </div>
            
            <div className="form-group">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input 
                type="password" 
                name="password_confirmation" 
                id="password_confirmation"
                onChange={formik.handleChange}
                value={formik.values.password_confirmation}
                className="form-control my-2"
              />
              {formik.errors.password_confirmation ? <div className="error">{formik.errors.password_confirmation}</div> : null}
            </div>
            
            <button type="submit" className="btn btn-warning px-4 py-1 w-100">Register</button>
          </form>
        </div>
      </div>
    </StyledRegister>
  )
}

export default Register;
