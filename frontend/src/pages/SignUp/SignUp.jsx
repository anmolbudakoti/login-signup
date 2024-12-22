import React from 'react';
import './SignUp.css';
import {ToastContainer} from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';

export default function SignUp() {
  const [signUpData, setSignUpData] = React.useState({
    username: '',
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    const copy = {...signUpData};
    copy[name] = value;
    setSignUpData(copy);
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    const {username, email, password} = signUpData;
    if (username === '' || email === '' || password === '') {
      return handleError('All fields are required');
    } 
    try{
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpData)
      })
      const result = await response.json();
      console.log(result);
      const {message, error} = result;
      if(message){
        handleSuccess(message);
        setSignUpData({
          username: '',
          email: '',
          password: ''
        });
        setTimeout(() => {
          navigate('/login');
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
    <div className='signup-page'>
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input type="text" onChange={handleChange} value={signUpData.username} placeholder='Type your Username..' id="username" name="username" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={handleChange} value={signUpData.email} placeholder='Type your e-mail..' id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" onChange={handleChange} value={signUpData.password} placeholder='Type your password..' id="password" name="password" />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
        <p className='more-fields'>Already have an account? <Link to={"/login"}>Login</Link></p>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
}