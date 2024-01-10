import React from 'react';
import yourImage from './wrong.jpeg';


const BadLogin = () => {
  return (
    <div className="dashboard-container">
      <h1 className="congratulations-text">WRONG CREDENTIALS</h1>
      <img className="dashboard-image" src={yourImage} alt="Centered Image" />
    </div>
  );
};


export default BadLogin;
