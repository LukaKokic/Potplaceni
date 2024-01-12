import React, { useState, useEffect } from 'react';
import '../index.css';
import Navbar from "./Navbar";
const AccommodationForm = () => {
  const [formData, setFormData] = useState({
    realEstateID: '',
    typeID: '',
    equippedID: '',
    latitude: '',
    longitude: '',
    address: '',
    townID: '',
    clinicID: '',
    active: ''
  });

  const [equippedOptions, setEquippedOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [townOptions, setTownOptions] = useState([]);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteAccommodationId, setDeleteAccommodationId] = useState('');

  const [isAvailabilityModalOpen, setAvailabilityModalOpen] = useState(false);
  const [availabilityAccommodationId, setAvailabilityAccommodationId] = useState('');
  const [availability, setAvailability] = useState('');

  const [accommodations, setAccommodations] = useState([]);
  const [expandedAccommodationId, setExpandedAccommodationId] = useState(null);

  useEffect(() => {
    // Pozovi funkcije za dohvaćanje opcija iz baze i postavi ih u state
    getEquippedOptions().then(options => setEquippedOptions(options));
    getTypeOptions().then(options => setTypeOptions(options));
    getTownOptions().then(options => setTownOptions(options));
  }, []); // Ovisno o potrebama i funkcijama koje su dostupne

  
  const getEquippedOptions = async () => {
    // Zamijeni s pravim pozivom API-ja ili funkcije
    return [
      { id: 1, type: 'poptuno opremljen' },
      // ...
    ];
  };

  const getTypeOptions = async () => {
    // Zamijeni s pravim pozivom API-ja ili funkcije
    return [
      { id: 1, type: 'nekakav tip' },
      // ...
    ];
  };

  const getTownOptions = async () => {
    // Zamijeni s pravim pozivom API-ja ili funkcije
    return [
      { id: 1, townName: 'nekakav grad' },
      // ...
    ];
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementiraj logiku za slanje podataka na backend
    // Primjer:
    // submitAccommodationForm(formData).then(response => console.log(response));
  };

  const handleSetAvailabilityClick = () => {
    setAvailabilityModalOpen(true);
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteAccommodation = () => {
    // Implementiraj logiku za brisanje smještaja
    // Pozovi API funkciju za brisanje
    // deleteAccommodation(deleteAccommodationId).then(response => console.log(response));
    setDeleteModalOpen(false);
  };

  const handleSetAvailability = () => {
    // Implementiraj logiku za postavljanje raspoloživosti smještaja
    // Pozovi API funkciju za postavljanje raspoloživosti
    // setAccommodationAvailability(availabilityAccommodationId, availability).then(response => console.log(response));
    setAvailabilityModalOpen(false);
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
                <h4 className='heading_form accommodation'>ADD <span>ACCOMMODATION</span></h4>
  
              
                <div className='row mt-4'>
                  <div className='col-lg-12'>
                    <a href='/' className='btn_form_submit btn_form_submit_left' onClick={handleSubmit}>VIEW ACCOMMODATIONS</a>
                  </div>
                </div>
  
                <div className='row mt-4'>
                  <div className='col-lg-4'>
                    <label htmlFor="" className='label'>Real Estate ID:</label><br />
                    <input type='text' name='realEstateID' className='input_box_form' value={formData.realEstateID} onChange={handleChange} />
                  </div>
                  <div className='col-lg-4'>
                    <label htmlFor="" className='label'>Type:</label><br />
                    <select name='typeID' className='input_box_form' value={formData.typeID} onChange={handleChange}>
                      <option value="">Choose Type</option>
                      {typeOptions.map(option => (
                        <option key={option.id} value={option.id}>{option.type}</option>
                      ))}
                    </select>
                  </div>
                  <div className='col-lg-4'>
                    <label htmlFor="" className='label'>Equipped:</label><br />
                    <select name='equippedID' className='input_box_form' value={formData.equippedID} onChange={handleChange}>
                      <option value="">Choose Equipped</option>
                      {equippedOptions.map(option => (
                        <option key={option.id} value={option.id}>{option.type}</option>
                      ))}
                    </select>
                  </div>
                </div>
  
                <div className='row mt-4'>
                  <div className='col-lg-4'>
                    <label htmlFor="" className='label'>Latitude:</label><br />
                    <input type='text' name='latitude' className='input_box_form' value={formData.latitude} onChange={handleChange} />
                  </div>
                  <div className='col-lg-4'>
                    <label htmlFor="" className='label'>Longitude:</label><br />
                    <input type='text' name='longitude' className='input_box_form' value={formData.longitude} onChange={handleChange} />
                  </div>
                  <div className='col-lg-4'>
                    <label htmlFor="" className='label'>Address:</label><br />
                    <input type='text' name='address' className='input_box_form' value={formData.address} onChange={handleChange} />
                  </div>
                </div>
  
                <div className='row mt-4'>
                  <div className='col-lg-4'>
                    <label htmlFor="" className='label'>Town:</label><br />
                    <select name='townID' className='input_box_form' value={formData.townID} onChange={handleChange}>
                      <option value="">Choose Town</option>
                      {townOptions.map(option => (
                        <option key={option.id} value={option.id}>{option.townName}</option>
                      ))}
                    </select>
                  </div>
                  <div className='col-lg-4'>
                    <label htmlFor="" className='label'>Clinic:</label><br />
                    <input type='text' name='clinicID' className='input_box_form' value={formData.clinicID} onChange={handleChange} />
                  </div>
                  <div className='col-lg-4'>
                    <label htmlFor="" className='label'>Active:</label><br />
                    <input type='text' name='active' className='input_box_form' value={formData.active} onChange={handleChange} />
                  </div>
                </div>
  
                <div className='col-lg-4'>
                  <a href='/' className='btn_form_submit btn_form_submit_left' onClick={handleSubmit}>SUBMIT NOW</a>
                </div>
                <div className='row mt-4'>
                  <div className='col-lg-4'>
                    <button className='btn_form_set_availabilityy' onClick={handleSetAvailabilityClick}>SET AVAILABILITY</button>
                  </div>
                  <div className='col-lg-4'>
                    <button className='btn_form_delete_red' onClick={handleDeleteClick}>DELETE</button>
                  </div>
                </div>
                {isDeleteModalOpen && (
                  <div className='delete-modal' style={{ position: 'absolute', top: '20px', right: '20px', width: '300px', padding: '20px' }}>
                    <div className='modal-content'>
                    <span className='close' onClick={() => setDeleteModalOpen(false)}>&times;</span>
                    <label htmlFor="deleteAccommodationId">Enter Accommodation ID to delete:</label>
                    <input type="text" id="deleteAccommodationId" value={deleteAccommodationId} onChange={(e) => setDeleteAccommodationId(e.target.value)} />
                    <button onClick={handleDeleteAccommodation}>Delete</button>
                  </div>
                </div>
              )}
                {isAvailabilityModalOpen && (
                  <div className='availability-modal'>
                    <div className='modal-content'>
                      <span className='close' onClick={() => setAvailabilityModalOpen(false)}>×</span>
                      <label htmlFor="availabilityAccommodationId">Enter Accommodation ID:</label>
                      <input type="text" id="availabilityAccommodationId" value={availabilityAccommodationId} onChange={(e) => setAvailabilityAccommodationId(e.target.value)} />
                      <label htmlFor="availability">Set Availability:</label>
                      <select id="availability" value={availability} onChange={(e) => setAvailability(e.target.value)}>
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                      </select>
                      <button onClick={handleSetAvailability}>Set Availability</button>
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
