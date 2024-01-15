import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import TransportationCarrier from './TransportationCarrier';
import Footer from './Footer';
import axios from 'axios';


const TransportationForm = () => {
  const [formData, setFormData] = useState({
    registration: '',
    capacity: '',
    type: '',
    brand: '',
    model: '',
    transporter_id: '',
    active: '',
  });

  const [vehicleTypeOptions, setVehicleTypeOptions] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTransporterId, setDeleteTransporterId] = useState('');

  const [isAvailabilityModalOpen, setAvailabilityModalOpen] = useState(false);
  const [availabilityTransporterId, setAvailabilityTransporterId] = useState('');
  const [availability, setAvailability] = useState('');
  
  useEffect(() => {
    // Pozovi funkcije za dohvaćanje opcija iz baze i postavi ih u state
    getVehicleTypeOptions().then(options => setVehicleTypeOptions(options));
  }, []); // Ovisno o potrebama i funkcijama koje su dostupne

  const getVehicleTypeOptions = async () => {
	let resp = await axios.get('https://expressware.onrender.com/get_vehicle_type_info')
	.catch(function (error) {
	  if (error.response.status == 404) { console.log("Error 404 getting vehicle types:", error); }
	  else { console.log("Unknown error while getting vehicle types:", error); }
	  return [
        { typeID: 1, desc: 'ERROR GETTING VEHICLE TYPES' },
      ];
	});
	console.log("vehicle types resp: ", resp);
	return resp;
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleSetAvailabilityClick = () => {
    setAvailabilityModalOpen(true);
  };

  const handleDeleteTransporter = () => {
    setDeleteModalOpen(false);
  };

  const handleSetAvailabilityTransporter = () => {
    setAvailabilityModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <div className='form_container_appointment'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 parent_container_content_form'>
              <div className='content_form'>
                <div className='container'>
                  <h4 className='heading_form bookAppointment'>
                    ADD <span>TRANSPORTER VEHICLE</span>
                  </h4>
                  <button className='btn_form_submit'>
                    VIEW TRANSPORTER VEHICLES
                  </button>
  
                  <div className='row mt-4'>
                    <div className='col-lg-4'>
                      <label htmlFor='registration' className='label'>
                        Registration
                      </label>
                      <br />
                      <input
                        type='text'
                        name='registration'
                        className='input_box_form'
                        placeholder='Registration'
                        value={formData.registration}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-lg-4'>
                      <label htmlFor='capacity' className='label'>
                        Capacity
                      </label>
                      <br />
                      <input
                        type='text'
                        name='capacity'
                        className='input_box_form'
                        value={formData.capacity}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-lg-4'>
                      <label htmlFor='type' className='label'>
                        Type
                      </label>
                      <br />
                      <select
                        name='type'
                        className='input_box_form'
                        value={formData.type}
                        onChange={handleChange}
                      >
                        <option value=''>Choose Type</option>
                        {vehicleTypeOptions.map((option) => (
                          <option key={option.typeID} value={option.typeID}>
                            {option.desc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='row mt-4'>
                    <div className='col-lg-4'>
                      <label htmlFor='brand' className='label'>
                        Brand
                      </label>
                      <br />
                      <input
                        type='text'
                        name='brand'
                        className='input_box_form'
                        placeholder='Brand'
                        value={formData.brand}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-lg-4'>
                      <label htmlFor='model' className='label'>
                        Model
                      </label>
                      <br />
                      <input
                        type='text'
                        name='model'
                        className='input_box_form'
                        placeholder='Model'
                        value={formData.model}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-lg-4'>
                      <label htmlFor='transporter_id' className='label'>
                        Transporter ID
                      </label>
                      <br />
                      <input
                        type='text'
                        name='transporter_id'
                        className='input_box_form'
                        value={formData.transporter_id}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='row mt-4'>
                    <div className='col-lg-4'>
                      <label htmlFor='active' className='label'>
                        Active
                      </label>
                      <br />
                      <input
                        type='text'
                        name='active'
                        className='input_box_form'
                        value={formData.active}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='row mt-4'>
                    <div className='col-lg-4'>
                      <a href='#' className='btn_form_submit'>
                        SUBMIT NOW
                      </a>
                    </div>
                    <div className='col-lg-4'>
                      <button className='btn_form_set_availability' onClick={handleSetAvailabilityClick}>
                        SET AVAILABILITY
                      </button>
                    </div>
                    <div className='col-lg-4'>
                      <button className='btn_form_delete btn_form_delete_red' onClick={handleDeleteClick}>
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
                {isDeleteModalOpen && (
                  <div className='delete-modal' style={{ position: 'absolute', top: '20px', right: '20px', width: '300px', padding: '20px' }}>
                    <div className='modal-content'>
                      <span className='close' onClick={() => setDeleteModalOpen(false)}>&times;</span>
                      <label htmlFor="deleteTransporterId">Enter Transporter ID to delete:</label>
                      <input type="text" id="deleteTransporterId" value={deleteTransporterId} onChange={(e) => setDeleteTransporterId(e.target.value)} />
                      <button onClick={handleDeleteTransporter}>Delete</button>
                    </div>
                  </div>
                )}

              {isAvailabilityModalOpen && (
                <div className='availability-modal'>
                  <div className='modal-content'>
                    <span className='close' onClick={() => setAvailabilityModalOpen(false)}>×</span>
                    <label htmlFor="availabilityTransporterId">Enter Transporter ID:</label>
                    <input type="text" id="availabilityTransporterId" value={availabilityTransporterId} onChange={(e) => setAvailabilityTransporterId(e.target.value)} />
                    <label htmlFor="availability">Set Availability:</label>
                    <select id="availability" value={availability} onChange={(e) => setAvailability(e.target.value)}>
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>
                <button onClick={handleSetAvailabilityTransporter}>Set Availability</button>
              </div>
              </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <TransportationCarrier />
      <Footer />
    </div>
  );
  
  
};

export default TransportationForm;
