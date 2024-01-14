import React, { useState, useEffect } from 'react';
import '../index.css';
import Navbar from "./Navbar";
const AccommodationForm = () => {
  const [formData, setFormData] = useState({
    PIN: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    rolelist: '',
  });

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletePatientId, setDeletePatientId] = useState('');
;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeletePatient = () => {
    setDeleteModalOpen(false);
  };



  

  return (
    <div>
      <Navbar />
    <div className='form_container_accommodation'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 parent_container_content_form'>
            <div className='content_form'>
              <div className='container'>
                <h4 className='heading_form accommodation'>ADD <span> PATIENT </span></h4>
  
              
                <div className='row mt-4'>
                  <div className='col-lg-12'>
                    <a href='/' className='btn_form_submit btn_form_submit_left' onClick={handleSubmit}>VIEW PATIENTS</a>
                  </div>
                </div>
  
                <div className='row mt-4'>
                  <div className='col-lg-4'>
                    <label htmlFor="" className='label'>PIN:</label><br />
                    <input type='text' name='pin' className='input_box_form' value={formData.PIN} onChange={handleChange} />
                  </div>
                  <div className='col-lg-4'>
                  <label htmlFor="" className='label'>Firstname:</label><br />
                    <input type='text' name='firstname' className='input_box_form' value={formData.firstname} onChange={handleChange} />
                  </div>
                  <div className='col-lg-4'>
                  <label htmlFor="" className='label'>Lastname:</label><br />
                    <input type='text' name='lastname' className='input_box_form' value={formData.lastname} onChange={handleChange} />
                  </div>
                  </div>
  
                <div className='row mt-4'>
                  <div className='col-lg-4'>
                    <label htmlFor="" className='label'>Phone:</label><br />
                    <input type='text' name='phone' className='input_box_form' value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className='col-lg-4'>
                    <label htmlFor="" className='label'>Email:</label><br />
                    <input type='text' name='email' className='input_box_form' value={formData.email} onChange={handleChange} />
                  </div>
                  <div className='col-lg-4'>
                    <label htmlFor="" className='label'>Rolelist:</label><br />
                    <input type='text' name='rolelist' className='input_box_form' value={formData.rolelist} onChange={handleChange} />
                  </div>
                
                  </div>
                <div className='col-lg-4'>
                  <a href='/' className='btn_form_submit btn_form_submit_left' onClick={handleSubmit}>SUBMIT NOW</a>
                </div>
                <div className='row mt-4'>
                  <div className='col-lg-4'>
                  </div>
                  <div className='col-lg-4'>
                    <button className='btn_form_delete_red' onClick={handleDeleteClick}>DELETE</button>
                  </div>
                </div>
                {isDeleteModalOpen && (
                  <div className='delete-modal' style={{ position: 'right', top: '20px', right: '10px', width: '300px', padding: '20px' }}>
                    <div className='modal-content'>
                    <span className='close' onClick={() => setDeleteModalOpen(false)}>&times;</span>
                    <label htmlFor="deleteAccommodationId">Enter Patient ID to delete:</label>
                    <input type="text" id="deleteAccommodationId" value={deletePatientId} onChange={(e) => setDeletePatientId(e.target.value)} />
                    <button onClick={handleDeletePatient}>Delete</button>
                  </div>
                </div>
              )}
  
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
  

  
  
}

export default AccommodationForm;
