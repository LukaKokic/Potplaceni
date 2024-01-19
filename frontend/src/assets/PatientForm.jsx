import React, { useState, useEffect } from 'react';
import '../index.css';
import Navbar from "./Navbar";
import axios from 'axios';
import {ValidatePIN, ValidatePhone, ValidateEMail, ValidateString, ValidateDropdown} from './InfoValidation';

async function getData(){
  let resp = await axios.get('https://expressware.onrender.com/view_patients');
  return resp;
}

const getEquippedOptions = async () => {
	let resp = await axios.get('https://expressware.onrender.com/get_accommodation_equipped_info')
	.then((response) => { return response.data; } )
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 getting equipment options:", error); }
	  else { console.error("Unknown error while getting equipment options:", error); }
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
	});
	//console.log("type options resp: ", resp);
	return resp;
};
const getTreatments = async () => {
	let resp = await axios.get('https://expressware.onrender.com/get_treatments_info')
	.then((response) => { return response.data; } )
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 getting type options:", error); }
	  else { console.error("Unknown error while getting typeOptions:", error); }
	});
	//console.log("treatments resp: ", resp);
	return resp;
};
const getClinics = async () => {
    let resp = await axios.get('https://expressware.onrender.com/get_clinics_info')
	.then((response) => { return response.data; } )
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 getting clinics:", error); }
	  else { console.error("Unknown error while getting clinics:", error); }
	});
	//console.log("clinics info resp: ", resp);
	return resp;
  };

const PatientForm = ({patientsUpdate}) => {
  const [formData, setFormData] = useState({
    pin: '',
    firstname: '',
    lastname: '',
    phone: '',
    mail: '',
    homeAddress: '',
	typePref: '',
	equippedPref: '',
	treatmentID: '',
	year: 125,
	month: 1,
	day: 1,
	clinicID: ''
  });

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletePatientId, setDeletePatientId] = useState('');
  
  const [equippedOptions, setEquippedOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
	getEquippedOptions().then(options => setEquippedOptions(options));
    getTypeOptions().then(options => setTypeOptions(options));
	getTreatments().then(result => setTreatments(result));
	getClinics().then(result => setClinics(result));
  }, []);

  // Date picking
  const years = Array.from({length: 201}, (_, i) => i + 1900);
  const dates = Array.from({length: 12}, (_, i) => {
	  let days = [];
	  if (i == 1) {  // February
		  days = Array.from({length: (formData.year % 4 == 0 ? 29 : 28)}, (_, j) => j + 1);
	  }
	  else if (i < 7) {
		days = Array.from({length: (i % 2 == 0 ? 31 : 30)}, (_, j) => j + 1);
	  }
	  else {
		days = Array.from({length: (i % 2 == 1 ? 31 : 30)}, (_, j) => j + 1);
	  }
	  return [i + 1, days];
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function submitForm(formData) {
	// Set date
	let date = years[formData.year - 1] + "-";
	let month = dates[formData.month - 1][0];
	if (month < 10) { date += "0"; }
	date += month + "-";
	let day = dates[formData.month - 1][1][formData.day - 1];
	if (day < 10) { date += "0"; }
	date += day;
	let data = {
		pin: formData.pin,
		firstname: formData.firstname,
		lastname: formData.lastname,
		phone: formData.phone,
		mail: formData.mail,
		homeAddress: formData.homeAddress,
		typePref: formData.typePref,
		equippedPref: formData.equippedPref,
		treatmentID: formData.treatmentID,
		treatmentDate: date,
		clinicID: formData.clinicID
	};
	let resp = await axios.post('https://expressware.onrender.com/add_patient', data)
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 submiting new patient:", error); }
	  else { console.error("Unknown error while submiting new patient:", error); }
	})
	;//.finally(() => { console.log("tried sending: ", data); });
	return resp;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
	if (ValidatePIN(formData.pin) &&
		ValidateString(formData.firstname, "First name") &&
		ValidateString(formData.lastname, "Last name") &&
		ValidatePhone(formData.phone) &&
		ValidateEMail(formData.mail) &&
		ValidateString(formData.homeAddress, "Home address") &&
		ValidateDropdown(formData.clinicID, "Clinic") &&
		ValidateDropdown(formData.treatmentID, "Treatment") &&
		//ValidateDate(formData.year, formData.month, formData.day) &&
		ValidateDropdown(formData.typePref, "Type preference") &&
		ValidateDropdown(formData.equippedPref, "Equipment preference")
		)
	{
		submitForm(formData).then(response => { 
			window.alert(response.data["msg"]);
			patientsUpdate();	
		});
	}
  };

  return (
    <div className='container_form'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 parent_container_content_form'>
            <div className='content_form'>
              <div className='container'>
                <h4 className='heading_form spanMainClr'>REGISTER <span>PATIENT</span></h4>
  
                <div className='row mt-4'>
                  <div className='col-lg-4'>
                    <label htmlFor="pin" className='label'>PIN:</label><br />
                    <input type='text' name='pin' className='input_box_form' value={formData.pin} onChange={handleChange} />
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
                    <label htmlFor="mail" className='label'>Email:</label><br />
                    <input type='text' name='mail' className='input_box_form' value={formData.mail} onChange={handleChange} />
                  </div>
                  <div className='col-lg-4'>
                    <label htmlFor="homeAddress" className='label'>Home address:</label><br />
                    <input type='text' name='homeAddress' className='input_box_form' value={formData.homeAddress} onChange={handleChange} />
                  </div>
				</div>
				  
				<div className='row mt-4'>
				  <div className='col-lg-4'>
                    <label htmlFor="clinicID" className='label'>Clinic:</label><br />
                    <select name='clinicID' className='input_box_form' value={formData.clinicID} onChange={handleChange}>
                      <option value="">Choose clinic</option>
                      {clinics.map(option => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
				  <div className='col-lg-4'>
                    <label htmlFor="treatmentID" className='label'>Treatment:</label><br />
                    <select name='treatmentID' className='input_box_form' value={formData.treatmentID} onChange={handleChange}>
                      <option value="">Choose treatment</option>
                      {treatments.map(option => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
				  <div className='col-lg-4'>
					<label className='label'>Date:</label><br />
					<select name='day' className='input_box_form_date' value={formData.day} onChange={handleChange}>
                      {	dates[formData.month - 1][1].map((d, i) => (
                        <option key={i + 1} value={i + 1}>{d}</option>
                      ))}
                    </select>
					<select name='month' className='input_box_form_date' value={formData.month} onChange={handleChange}>
                      {dates.map((d, i) => (
                        <option key={i + 1} value={i + 1}>{d[0]}</option>
                      ))}
                    </select>
					<select name='year' className='input_box_form_date' value={formData.year} onChange={handleChange}>
                      {years.map((y, i) => (
                        <option key={i + 1} value={i + 1}>{y}</option>
                      ))}
                    </select>
				  </div>
				</div>
				
				<div className='row mt-4'>
                  <div className='col-lg-4'>
                    <label htmlFor="" className='label'>Type preference:</label><br />
                    <select name='typePref' className='input_box_form' value={formData.typePref} onChange={handleChange}>
                      <option value="">Choose type</option>
                      {typeOptions.map(option => (
                        <option key={option.id} value={option.id}>{option.type}</option>
                      ))}
                    </select>
                  </div>
				  <div className='col-lg-4'>
                    <label htmlFor="" className='label'>Equipment preference:</label><br />
                    <select name='equippedPref' className='input_box_form' value={formData.equippedPref} onChange={handleChange}>
                      <option value="">Choose equipment</option>
                      {equippedOptions.map(option => (
                        <option key={option.id} value={option.id}>{option.type}</option>
                      ))}
                    </select>
                  </div>
				</div>	
                <a href='/' className='btn_form_submit btn_form_submit_left' onClick={handleSubmit}>SUBMIT</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientForm;
