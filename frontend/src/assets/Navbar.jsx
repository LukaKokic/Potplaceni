import React from 'react';
import logo from './pictures/logo.webp';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar navbarEdit navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <a href="/dashboard"><img src={logo} className='logo_img' alt='Logo Website'></img></a>
          </a>
    
          <span className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><i className='fa fa-bars bars'></i></span>
          <div className="collapse navbar-collapse" id="navbarNav">
  <ul className="navbar-nav px-3">
    <li className="nav-item">
      <Link to="/dashboard" className="nav-link">Home</Link>
    </li>
    <li className="nav-item">
    <Link to="/dashboard#about" className="nav-link">About Us</Link>
    </li>
    <li className="nav-item">
    <Link to="/accommodation-management" className="nav-link">Acc. Mngmt.</Link>
    </li>
    <li className="nav-item">
    <Link to="/transporation-form" className="nav-link">Transportation</Link>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">User Mgmt.</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">Add Patients</a>
    </li>
  </ul>
</div>
          {/* 2 */}
          <div className='navbar_media'>
            <span className='icon_media'><i className='fa fa-phone phone_media'></i></span> <span className='number'>(+385) 958 278 126</span>
            <a href='/' className='btn_media_navbar bookNow'>Log out</a>
          </div>
        </div>
      </nav>
  );
};


export default Navbar;
