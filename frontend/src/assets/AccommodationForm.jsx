import React, { useState, useEffect } from 'react';
import '../index.css';
import axios from 'axios';
// Validation
import {ValidateNumber, ValidateString, ValidateDropdown} from './InfoValidation';

const getEquippedOptions = async () => {
	let resp = await axios.get('https://expressware.onrender.com/get_accommodation_equipped_info')
	.then((response) => { return response.data; } )
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 getting equipment options:", error); }
	  else { console.error("Unknown error while getting equipment options:", error); }
	  return [
        { id: 1, type: 'ERROR GETTING EQUIPMENT' },
      ];
	});
	//console.log("equipped info resp: ", resp);
	return resp;
};
const getTypeOptions = async () => {
	let resp = await axios.get('https://expressware.onrender.com/get_accommodation_type_info')
	.then((response) => { return response.data; } )
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 getting type options:", error); }
	  else { console.error("Unknown error while getting typeOptions:", error); }
	  return [
        { id: 1, type: 'ERROR GETTING TYPES' },
      ];
	});
	//console.log("type options resp: ", resp);
	return resp;
};
const getTowns = async () => {
    let resp = await axios.get('https://expressware.onrender.com/get_towns_info')
	.then((response) => { return response.data; } )
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 getting towns:", error); }
	  else { console.error("Unknown error while getting towns:", error); }
	  return [
        { id: 1, townName: 'ERROR GETTING TOWNS' },
      ];
	});
	//console.log("towns info resp: ", resp);
	return resp;
 };
const getClinics = async () => {
	let resp = await axios.get('https://expressware.onrender.com/get_clinics_info')
	.then((response) => { return response.data; } )
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 getting clinics:", error); }
	  else { console.error("Unknown error while getting clinics:", error); }
	  return [
        { id: 1, name: 'ERROR GETTING CLINICS' },
      ];
	});
	//console.log("clinics info resp: ", resp);
	return resp;
};

const AccommodationForm = ({accsUpdate}) => {
  const [formData, setFormData] = useState({
    realEstateID: "",
    typeID: "",
    equippedID: "",
    latitude: '',
    longitude: '',
    address: '',
    townID: "",
    clinicID: "",
    active: false
  });

  const [equippedOptions, setEquippedOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [towns, setTowns] = useState([]);
  const [clinics, setClinics] = useState([]);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteAccommodationId, setDeleteAccommodationId] = useState('');

  const [isAvailabilityModalOpen, setAvailabilityModalOpen] = useState(false);
  const [availabilityAccommodationId, setAvailabilityAccommodationId] = useState('');
  const [availability, setAvailability] = useState('');

  const [accommodations, setAccommodations] = useState([]);
  const [expandedAccommodationId, setExpandedAccommodationId] = useState(null);

  useEffect(() => {
    getEquippedOptions().then(options => setEquippedOptions(options));
    getTypeOptions().then(options => setTypeOptions(options));
    getTowns().then(result => setTowns(result));
	getClinics().then(result => setClinics(result));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCheckboxChange = (e) => {
	setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  async function submitForm(formData){
	let data = {
		realEstateID: formData.realEstateID,
		typeID: formData.typeID,
		equippedID: formData.equippedID,
		latitude: formData.latitude,
		longitude: formData.longitude,
		address: formData.address,
		townID: formData.townID,
		clinicID: formData.clinicID,
		active: (formData.active == true ? "1" : "0")
	};
	let resp = await axios.post('https://expressware.onrender.com/add_accommodation', {data})
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 submiting new accommodation:", error); }
	  else { console.error("Unknown error while submiting new accommodation:", error); }
	})
	.finally(() => {
		console.log("tried sending: ", data);
	});
    return resp;
  };
  const handleSubmit = (e) => {
	//console.log(formData);
    e.preventDefault();
	if (ValidateNumber(formData.realEstateID, "Real Estate ID") &&
		ValidateDropdown(formData.typeID, "Type") &&
		ValidateDropdown(formData.equippedID, "Equipment") &&
		ValidateNumber(formData.latitude, "Latitude") &&
		ValidateNumber(formData.longitude, "Longitude") &&
		ValidateString(formData.address, "Address") &&
		ValidateDropdown(formData.townID, "Town") &&
		ValidateDropdown(formData.clinicID, "Clinic")) 
	{
		submitForm(formData).then(response => {
			console.log("form submitted; response: ", response);
			if (response.data.success) { 
				window.alert("Accommodation added successfully.");
				accsUpdate();;
			}
			else { window.alert("FAILURE: Failed to add accommodation."); }
		});
	}
  };

  return (
    <div className='container-form'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 parent_container_content_form'>
            <div className='content_form'>
              <div className='container'>
                <h4 className='heading_form spanMainClr'>ADD <span>ACCOMMODATION</span></h4>
  
                <div className='row mt-4'>
                  <div className='col-lg-4'>
                    <label htmlFor="realEstateID" className='label'>Real Estate ID:</label><br />
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
                    <label htmlFor="" className='label'>Equipment:</label><br />
                    <select name='equippedID' className='input_box_form' value={formData.equippedID} onChange={handleChange}>
                      <option value="">Choose Equipment</option>
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
                      {towns.map(option => (
                        <option key={option.id} value={option.id}>{option.townName}</option>
                      ))}
                    </select>
                  </div>
                  <div className='col-lg-4'>
                    <label htmlFor="" className='label'>Clinic:</label><br />
                    <select name='clinicID' className='input_box_form' value={formData.clinicID} onChange={handleChange}>
                      <option value="">Choose Clinic</option>
                      {clinics.map(option => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className='col-lg-4'>
					<label htmlFor="active" className='label'>Active:</label>
					<input type="checkbox" name="active" value={formData.active} onChange={handleCheckboxChange}/>
                  </div>
                </div>
  
                <div className='col-lg-4'>
                  <a href='/' className='btn_form_submit btn_form_submit_left' onClick={handleSubmit}>SUBMIT</a>
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
