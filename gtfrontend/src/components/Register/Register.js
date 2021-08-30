import React from 'react'
import StyledRegister from './Register.styled'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';



const Register = () => {

  const history = useHistory();
  // state of the component
  const [userData, setUserData] = useState({
    first_name:'',
    last_name:'',
    email:'',
    occupation:'Choose your occupation',
    password:'',
    password_confirmation:'',
    remember_token: false  
  });
  // change handler
  const handleChange = (e) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };  
  // submit button function, sends POST request to backend with state attached
  const signUp = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {
      await axios.post("http://localhost:8000/api/register", userData)
      .then(response => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <StyledRegister className="pt-3">
      <div className="wrapper m-auto col-sm-6 p-4 ">
        <div className="container m-auto">
        <h1 className="pb-3">Register</h1>
          <form action="">
            <div className="form-group">
              <label>First Name:</label>
              <input type="text" name="first_name" onChange={e=>handleChange(e)} placeholder="Gareth" className="form-control my-2 "/>
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="last_name" onChange={e=>handleChange(e)} placeholder="Webster" className="form-control my-2 "/>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" onChange={e=>handleChange(e)} placeholder="gareth@webster.com" className="form-control my-2 "/>
            </div>
            <div className="form-group">
              <label>Occupation</label>
                <select className="form-select" name="occupation" defaultValue={userData.occupation} onChange={e=>handleChange(e)}>
                  <option value={userData.occupation} disabled hidden >Choose your occupation</option>
                  <option value="Oa / Support">OA / Support</option>
                  <option value="Dispensing Optician">Dispensing Optician</option>
                  <option value="Manager">Manager</option>
                  <option value="Optometrist">Optometrist</option>
                  <option value="Admin">Admin</option>
                  <option value="HC assistant">HC assistant</option>
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
            <button type="submit" onClick={signUp} className="btn btn-warning px-4 py-1 w-100">Register</button>
          </form>
        </div>
      </div>
    </StyledRegister>
  )
}

export default Register
