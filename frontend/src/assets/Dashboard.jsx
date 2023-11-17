import React from 'react';
import './Dashboard.css';
import yourImage from './darth_vader.webp';


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="congratulations-text">Congratulations, you logged in!</h1>
      <img className="dashboard-image" src={yourImage} alt="Centered Image" />
    </div>
  );
};


export default Dashboard;
