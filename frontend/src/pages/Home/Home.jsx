import React from 'react';
import './Home.css';
import { handleSuccess } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    handleSuccess("Logged out successfully");
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Our Website</h1>
        <p>Your one-stop solution for all your needs.</p>
        <button className="home-button">Get Started</button>
      </header>
      <section className="home-content">
        <div className='home-card'>
          <button onClick={handleLogout} className="home-button">Logout</button>        
        </div>
      </section>
      <ToastContainer/>
    </div>
  );
}