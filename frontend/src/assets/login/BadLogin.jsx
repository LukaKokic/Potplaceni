import React from 'react';
import wrongImg from './wrong.jpeg';


const BadLogin = () => {
  return (
    <div className="dashboard-container">
      <h1 className="congratulations-text">WRONG CREDENTIALS</h1>
      <img className="dashboard-image" src={wrongImg} alt="Centered Image" />
    </div>
  );
};


export default BadLogin;
