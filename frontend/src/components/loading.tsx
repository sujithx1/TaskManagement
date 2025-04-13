import React from 'react';
import './loading.scss'; // optional for extra style

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen">
    <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
  );
};

export default LoadingScreen;
