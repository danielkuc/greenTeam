import React from 'react'
import StyledRegister from './Register.styled'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const Register = () => {

  const history = useHistory();
  const [userData, setUserData] = useState({
    first_name:'',
    last_name:'',
    email:'',
    occupation:'',
    password:'',
    password_confirmation:'',
    remember_token: false  
  });
  
  const handleChange = (e) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
        remember_token: e.target.checked
      };
    });
  };  

  const signUp = async (e) => {
    e.preventDefault();
    console.log(userData);
    console.log();
    // try {
    //   await axios.post("http://localhost:8000/api/register", userData)
    //   .then(response => {
    //     console.log(response);
    //   });
    // } catch (error) {
    //   console.log(error);
    // };
  };

  return (
    <StyledRegister>
      <h1 className="pb-3">Register</h1>
      <div className="container m-auto col-sm-4">
        <form action="">
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" name="first_name" onChange={e=>handleChange(e)} className="form-control my-2 "/>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="last_name" onChange={e=>handleChange(e)} className="form-control my-2 "/>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" onChange={e=>handleChange(e)} className="form-control my-2 "/>
          </div>
          <div className="form-group">
            <label>Occupation</label>
              <select name="occupation" id="occupation" onChange={e=>handleChange(e)}>
                <option value="OA / Support">OA / Support</option>
                <option value="Dispensing Optician">Dispensing Optician</option>
                <option value="Manager">Manager</option>
                <option value="Optometrist">Optometrist</option>
              </select>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" onChange={e=>handleChange(e)} className="form-control my-2 "/>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="password_confirmation" onChange={e=>handleChange(e)} className="form-control my-2 "/>
          </div>
          <div className="form-group">
            <input type="checkbox" name="remember_token" id="token" checked={userData.remember_token} onChange={e=>handleChange(e)} />
            <label htmlFor="token">remember me</label>
          </div>
          <button type="submit" onClick={signUp} className="btn btn-primary">Sign In</button>
        </form>
      </div>
    </StyledRegister>
  )
}

export default Register
