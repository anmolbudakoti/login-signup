import React from 'react';
import './Login.css';
import {ToastContainer} from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';

export default function Login() {
  const [loginData, setLoginData] = React.useState({
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    const copy = {...loginData};
    copy[name] = value;
    setLoginData(copy);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const {email, password} = loginData;
    if (email === '' || password === '') {
      return handleError('All fields are required');
    } 
    try{
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
      const result = await response.json();
      console.log(result);
      const {message, error, token} = result;
      if(message){
        handleSuccess(message);
        localStorage.setItem('jwtToken', token);
        setLoginData({
          email: '',
          password: ''
        });
        setTimeout(() => {
          navigate('/home');
        }, 3000);
      }
      else if(error){
        handleError(error);
    }
    }
    catch(err){
      handleError(err);
    }
  }
  
  return (
    <div className='login-page'>
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input onChange={handleChange} value={loginData.email} placeholder='Enter your e-mail..' type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={handleChange} value={loginData.password} placeholder='Enter your password..' type="password" id="password" name="password" />
        </div>
        <button type="submit" className="login-button">Login</button>
        <p className='more-fields'>Don't have an account? <Link to={"/register"}>Sign Up</Link></p>
      </form>
      <ToastContainer/>
    </div>
    </div>
  );
}