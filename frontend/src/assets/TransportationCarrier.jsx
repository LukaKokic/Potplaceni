import React, { useState, useEffect } from 'react';

const TransportationCarrier = () => {
  const [carrierFormData, setCarrierFormData] = useState({
    registration: '',
    capacity: '',
    type: '',
    brand: '',
    model: '',
    transporter_id: '',
    active: '',
  });

  const [carrierVehicleTypeOptions] = useState([]);
  const [isCarrierDeleteModalOpen, setCarrierDeleteModalOpen] = useState(false);
  const [carrierDeleteTransporterId, setCarrierDeleteTransporterId] = useState('');

  const [isCarrierAvailabilityModalOpen, setCarrierAvailabilityModalOpen] = useState(false);
  const [carrierAvailabilityTransporterId, setCarrierAvailabilityTransporterId] = useState('');
  const [carrierAvailability, setCarrierAvailability] = useState('');

  const handleCarrierDeleteClick = () => {
    setCarrierDeleteModalOpen(true);
  };

  const handleCarrierSetAvailabilityClick = () => {
    setCarrierAvailabilityModalOpen(true);
  };

  const handleCarrierDeleteTransporter = () => {
    setCarrierDeleteModalOpen(false);
  };

  const handleCarrierSetAvailabilityTransporter = () => {
    setCarrierAvailabilityModalOpen(false);
  };

  const handleCarrierChange = (e) => {
    setCarrierFormData({ ...carrierFormData, [e.target.name]: e.target.value });
  };
  return (
    <div className='form_container_appointment'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 parent_container_content_form'>
              <div className='content_form'>
                <div className='container'>
                  <h4 className='heading_form bookAppointment'>
                    ADD <span>TRANSPORTER</span>
                  </h4>
                  <button className='btn_form_submit'>
                    VIEW TRANSPORTERS
                  </button>
  
                  <div className='row mt-4'>
                    <div className='col-lg-4'>
                      <label htmlFor='registration' className='label'>
                        Organization Name
                      </label>
                      <br />
                      <input
                        type='text'
                        name='Organization Name'
                        className='input_box_form'
                        placeholder='Organization Name'
                        value={carrierFormData.registration}
                        onChange={handleCarrierChange}
                      />
                    </div>
                    <div className='col-lg-4'>
                      <label htmlFor='capacity' className='label'>
                        Contact
                      </label>
                      <br />
                      <input
                        type='text'
                        name='Contact'
                        className='input_box_form'
                        placeholder='Contact'
                        value={carrierFormData.capacity}
                        onChange={handleCarrierChange}
                      />
                    </div>
                    <div className='col-lg-4'>
                      <label htmlFor='brand' className='label'>
                        Address
                      </label>
                      <br />
                      <input
                        type='text'
                        name='Address'
                        className='input_box_form'
                        placeholder='Address'
                        value={carrierFormData.brand}
                        onChange={handleCarrierChange}
                      />
                    </div>
                  </div>
                  <div className='row mt-4'>
                    <div className='col-lg-4'>
                      <label htmlFor='model' className='label'>
                        TownID
                      </label>
                      <br />
                      <input
                        type='text'
                        name='model'
                        className='input_box_form'
                        value={carrierFormData.model}
                        onChange={handleCarrierChange}
                      />
                    </div>
                    <div className='col-lg-4'>
                      <label htmlFor='active' className='label'>
                        Active
                      </label>
                      <br />
                      <input
                        type='text'
                        name='active'
                        className='input_box_form'
                        value={carrierFormData.active}
                        onChange={handleCarrierChange}
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
                      <button className='btn_form_delete btn_form_delete_red' onClick={handleCarrierDeleteClick}>
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
                {isCarrierDeleteModalOpen && (
                  <div className='delete-modal' style={{ position: 'absolute', top: '20px', right: '20px', width: '300px', padding: '20px' }}>
                    <div className='modal-content'>
                      <span className='close' onClick={() => setCarrierDeleteModalOpen(false)}>&times;</span>
                      <label htmlFor="deleteTransporterId">Enter Transporter ID to delete:</label>
                      <input type="text" id="deleteTransporterId" value={carrierDeleteTransporterId} onChange={(e) => setCarrierDeleteTransporterId(e.target.value)} />
                      <button onClick={handleCarrierDeleteTransporter}>Delete</button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TransportationCarrier;
