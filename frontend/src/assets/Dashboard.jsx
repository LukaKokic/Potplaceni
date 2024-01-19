import React, {useState, useEffect} from 'react';
import AboutUs from './AboutUs';
import Services from './Services';
import Footer from './Footer';
import Navbar from "./Navbar";
import {GetUser} from "./login/Login"

export default function Dashboard() {
	const [user, setUser] = useState(null);
	// Get user
	useEffect(() => {
		setUser(GetUser());
	}, []);
  
	
  return (
    <div className='header'>
      <Navbar />
	  
      <div className="banner-section">
        <div className='container'>
            <div className='content_banner'>
                <h2 className='heading_home'>Crafting Your<br></br> Path in Health Tourism</h2>
                <p className='paragraph_home'>Experience the fusion of health and exploration. DentALL opens the door to seamless health travels. Intrigued? Start your adventure now. </p>

                <div className='btns_media_home pt-4'>
                    <a href='#' className='btn_home'>Get Started</a>
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
