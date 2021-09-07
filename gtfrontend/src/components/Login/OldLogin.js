import React from 'react';
import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import StyledLogin from './Login.styled';
import axios from 'axios';

const Login = () => {
  const [userData, setUserData] = useState({email:'',password:''});
  // const history = useHistory();

  const handleChange = (e) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {withCredentials:true}).then(response => {
        console.log(response);
        axios.post("http://localhost:8000/api/login", userData)
        .then(response => {
          console.log(response);
        })
      })
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <StyledLogin>
      <h1 className="pb-3">Login</h1>
      <div className="container m-auto col-sm-4">
        <form action="">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" onChange={e=>handleChange(e)} className="form-control my-2 "/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" onChange={e=>handleChange(e)} className="form-control my-2 "/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={login}>Log In</button>
        </form>
      </div>
    </StyledLogin>
  )
}

// export default Login;
