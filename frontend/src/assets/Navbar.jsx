import React from 'react';
import logo from './pictures/logo.webp';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar navbarEdit navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar-brand">
            <a href="/dashboard"><img src={logo} className='logo_img' alt='Logo Website'></img></a>
          </div>
    
          <span className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><i className='fa fa-bars bars'></i></span>
          <div className="collapse navbar-collapse" id="navbarNav">
  <ul className="navbar-nav px-3">
    <li className="nav-item">
      <Link to="/dashboard" className="nav-link" id="navHome">Home</Link>
    </li>
    <li className="nav-item">
	  <Link to="/dashboard#about" className="nav-link" id="navAbout">About Us</Link>
    </li>
    <li className="nav-item">
	  <Link to="/accommodation-management" className="nav-link" id="navAcc">Acc. Mngmt.</Link>
    </li>
    <li className="nav-item">
	  <Link to="/transporation-form" className="nav-link" id="navTrans">Transportation</Link>
    </li>
    <li className="nav-item">
      <Link to="/user-management" className="nav-link" id="navUsers">User Mgmt.</Link>
    </li>
    <li className="nav-item">
      <Link to="/add-patient" className="nav-link" id="navPats">Add Patients</Link>
    </li>
  </ul>
</div>
          {/* 2 */}
          <div className='navbar_media'>
            <span className='icon_media'><i className='fa fa-phone phone_media'></i></span> <span className='number'>(+385) 958 278 126</span>
            <a href='/' className='btn_media_navbar bookNow' id="nav_logOut">Log out</a>
          </div>
        </div>
      </nav>
  );
};


export default Navbar;
