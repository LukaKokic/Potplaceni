import React from 'react';
import AboutUs from './AboutUs';
import Services from './Services';
import Footer from './Footer';

import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    
    <div className='header'>
      {/* #1 */}
      <Navbar />
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

      
      <AboutUs />

      <Services />
      
      <Footer />
      
    </div>
  );
};


export default Dashboard;
