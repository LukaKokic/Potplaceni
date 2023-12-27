import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import './responsive.css';


ReactDOM.render(
  <div className='App'>
    <Navbar />
  </div>,
  document.getElementById('root')
);
