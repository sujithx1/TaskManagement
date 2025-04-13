import React from 'react';
import {  useNavigate } from 'react-router-dom';
import './NotFound.scss';

const NotFound: React.FC = () => {
    const navigate=useNavigate()
  return (
    <div className="notfound-wrapper">
      <div className="notfound-card">
        <h1>404</h1>
        <p className="subtitle">Oops! Page not found</p>
        <p className="description">
          The page you're looking for doesn't exist or was moved.
        </p>
        <button className="home-btn" onClick={() => navigate(-1)}>
      ⬅ Go back to Dashboard
    </button>   

      </div>
    </div>
  );
};

export default NotFound;
