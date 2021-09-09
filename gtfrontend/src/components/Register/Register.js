import React from 'react';
// formik - open source form library for React
import { useFormik } from 'formik';
import { CONTAINER } from './Register.styled';
// Yup - JS schema builder for validation and value parsing
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
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
    try {
      await axios.post('http://localhost:8000/api/register', values).then(response => {
        return response.json();
      });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        formik.setFieldError('email', 'Email must be unique');
      }
    }    
  };



  // initializing formik: passing state and submit.
  const formik = useFormik({
    initialValues:data,
    validationSchema:validator ,
    onSubmit: handleSubmit
  });


  return(
    <CONTAINER>
      Hello from Register
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

