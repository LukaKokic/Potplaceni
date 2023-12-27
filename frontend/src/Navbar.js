import React from 'react';
import FormAppointment from './formAppointment';
import AboutUs from './AboutUs';
import Services from './Services';
import AccommodationOffer from "./AccommodationOffer";
import Transportation from './Transportation';


const Navbar = () => {
  return (
    <div className='header'>
      {/* #1 */}
      <nav className="navbar navbarEdit navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={require('/Users/Teo/my-app/src/pictures/logo.png')} className='logo_img' alt='Logo Website'></img>
          </a>
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <span className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><i className='fa fa-bars bars'></i></span>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav px-3">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About Us</a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link" href="#">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Book Now</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Blogs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Support</a>
              </li>
            </ul>
          </div>
          {/* 2 */}
          <div className='navbar_media'>
            <span className='icon_media'><i className='fa fa-phone phone_media'></i></span> <span className='number'>(+385) 958 278 126</span>
            <a href='#' className='btn_media_navbar bookNow'>Sign Up</a>
          </div>
        </div>
      </nav>
      <div className="banner-section">
        <div className='container'>
            <div className='content_banner'>
                <h2 className='heading_home'>Crafting Your<br></br> Path in Health Tourism</h2>
                <p className='paragraph_home'>Experience the fusion of health and exploration. DentALL opens the door to seamless health travels. Intrigued? Start your adventure now. </p>

                <div className='btns_media_home pt-4'>
                    <a href='#' className='btn_home'>Get Started</a>
                    <a href='#' className='play_btn playButton'><i className='fa fa-play'></i></a> <span className='play_btn_span'>Watch Video</span>
                </div>
            </div>
        </div>
      </div>

      <FormAppointment />
      {/*About Us #3 */}
    
      <AboutUs />

      {/*Services #4 */}
      
      <Services />


      {/*Ponuda smještja */}

      <AccommodationOffer />

      {/*Ponuda prijevoza */}
      <Transportation />
      
    </div>

  );
}

export default Navbar;