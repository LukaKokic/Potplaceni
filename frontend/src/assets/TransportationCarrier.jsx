import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransportationCarrier = () => {
  const [carrierFormData, setCarrierFormData] = useState({
    orgName: '',
    contact: '',
    email: '',
    townID: '',
    active: ''
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
  
  async function carrierSubmitForm(formData) {
	let resp = await axios.post('https://expressware.onrender.com/add_transporter', {
		params: formData
	})
	.then((response) => { return response.data; })
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 submiting new user:", error); }
	  else { console.error("Unknown error while submiting new user:", error); }
	})
	.finally(() => {
		console.log("tried sending: ", formData);
	});
	return resp;
  };
  const handleCarrierSubmit = (e) => {
	e.preventDefault();
	carrierSubmitForm(carrierFormData).then(response => console.log("form submitted; response: ", response));
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
                      <label htmlFor='orgName' className='label'>
                        Organization Name
                      </label>
                      <br />
                      <input
                        type='text'
                        name='orgName'
                        className='input_box_form'
                        placeholder='Organization Name'
                        value={carrierFormData.orgName}
                        onChange={handleCarrierChange}
                      />
                    </div>
                    <div className='col-lg-4'>
                      <label htmlFor='contact' className='label'>
                        Contact
                      </label>
                      <br />
                      <input
                        type='text'
                        name='contact'
                        className='input_box_form'
                        placeholder='Contact'
                        value={carrierFormData.contact}
                        onChange={handleCarrierChange}
                      />
                    </div>
                    <div className='col-lg-4'>
                      <label htmlFor='address' className='label'>
                        Address
                      </label>
                      <br />
                      <input
                        type='text'
                        name='address'
                        className='input_box_form'
                        placeholder='Address'
                        value={carrierFormData.address}
                        onChange={handleCarrierChange}
                      />
                    </div>
                  </div>
                  <div className='row mt-4'>
                    <div className='col-lg-4'>
                      <label htmlFor='townID' className='label'>
                        TownID
                      </label>
                      <br />
                      <input
                        type='text'
                        name='townID'
                        className='input_box_form'
                        value={carrierFormData.townID}
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
                      <a href='#' className='btn_form_submit' onClick={handleCarrierSubmit}>
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
