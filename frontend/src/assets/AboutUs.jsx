import React from "react";

const AboutUs = () => {
return(<div className='about_us'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6'>
            <h3 className='heading_about'>About Us</h3>
            <p className='para_about'>Welcome to DentAll, where we redefine healthcare travel with a mission to make your medical experiences seamless and stress-free. At DentAll, we understand the importance of not only providing top-notch healthcare services but also ensuring your entire journey is comfortable and worry-free.</p>
            <p className='para_about'>At DentAll, we go beyond borders to provide you with a healthcare journey that combines excellence in treatment with the ease of travel. Join us, and let's embark on a journey to a healthier, happier you!</p>

          </div>
          <div className='col-lg-6 d-flex justify-content-center align-item'>
            <div className='circle_container shadow-lg'>
              <p className='text_circle_container'><span className='number_title'>12</span>Years<br></br>of Experiences</p>
            </div>
          </div>
        </div>
      </div>
    </div>
);
}

export default AboutUs;