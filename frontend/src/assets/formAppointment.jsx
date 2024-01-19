import React from 'react';

const FormAppointment = () => {
  return (
    <div className='form_container_appointment'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 parent_container_content_form'>
              <div className='content_form'>
                  <div className='container'>
                    <h4 className='heading_form bookAppointment'>BOOK <span>APPOINTMENT</span></h4>
                    <div className='row mt-4'>
                      <div className='col-lg-4'>
                      <label htmlFor="" className='label'>Patient Name</label><br></br>
                      <input type='text' className='input_box_form' placeholder='Patient Name'/>
                      </div>
                      <div className='col-lg-4'>
                      <label htmlFor="" className='label'>Patient Surname</label><br></br>
                      <input type='text' className='input_box_form' placeholder='Patient Surname'/>
                      </div>
                      <div className='col-lg-4'>
                      <label htmlFor="" className='label'>Transportation</label><br></br>
                      <select name='' id='' className='input_box_form'>
                        <option value="" >No</option>
                        <option value="" >Yes</option>
                        
                      </select>
                      </div>
                    </div>
                    <div className='row mt-4'>
                      <div className='col-lg-4'>
                      <label htmlFor="" className='label'>E-mail</label><br></br>
                      <input type='text' className='input_box_form'/>
                      </div>
                      <div className='col-lg-4'>
                      <label htmlFor="" className='label'>Phone Number</label>
                      <input type='text' className='input_box_form' placeholder='XXX XXXXXXXXX' />
                      </div>
                      <div className='col-lg-4'>
                      <label htmlFor="" className='label'>Choose Date & Time</label>
                      <input type='datetime-local' name='' id='' className='input_box_form'></input>
                      
                      </div>
                    </div>

                    <a href='a' className='btn_form_submit'>SUBMIT NOW</a>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormAppointment;