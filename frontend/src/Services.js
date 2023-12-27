import React from "react";

const Services = () => {
return (
<section className='services'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-4 col-6'>
              <div className='services_content'>
                <span className='icon_services'><img src={require('/Users/Teo/my-app/src/pictures/icon2.png')} className='icon_img' alt='icon'></img></span>
                <h3 className='heading_services'>Accommodation Coordination</h3>
                <p className='para_service'>Our dedicated team ensures that you experience a comfortable stay during your health journey. We provide a range of accommodation options tailored to your preferences and budget. From cozy apartments to luxury hotels, we take care of the details, allowing you to focus on your well-being.</p>
              </div>
            </div>
            <div className='col-lg-4 col-6'>
              <div className='services_content'>
                <span className='icon_services'><img src={require('/Users/Teo/my-app/src/pictures/icon2.png')} className='icon_img' alt='icon'></img></span>
                <h3 className='heading_services'>Transportation Services</h3>
                <p className='para_service'>Seamless transportation is a key element of your health tourism experience. DentAll offers reliable and efficient transportation services, ensuring you reach your medical appointments and accommodation stress-free. Whether it's a private car, shuttle service, or local transportation, we prioritize your convenience and safety.</p>
              </div>
            </div>
            <div className='col-lg-4 col-6 service-3'>
              <div className='services_content service_content_3'>
                <span className='icon_services'><img src={require('/Users/Teo/my-app/src/pictures/icon2.png')} className='icon_img' alt='icon'></img></span>
                <h3 className='heading_services'>Healthcare</h3>
                <p className='para_service'>DentAll goes beyond standard healthcare services by offering personalized assistance throughout your medical journey. Our team connects you with the right healthcare providers, schedules appointments, and provides support tailored to your specific needs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

);
}

export default Services;