import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import TransportationCarrier from './TransportationCarrier';
import Footer from './Footer';
import axios from 'axios';
import {ValidateString, ValidatePhone, ValidateEMail, ValidateDropdown} from './InfoValidation';


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

const TransporterForm = ({transportersUpdate}) => {
  const [formData, setFormData] = useState({
    orgName: '',
    contact: '',
    email: '',
    townID: '',
    active: ''
  });
  
  const [towns, setTowns] = useState([]);
  
  useEffect(() => {
    getTowns().then(result => setTowns(result));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCheckboxChange = (e) => {
	setFormData({ ...formData, [e.target.name]: e.target.checked });
  };
  
  async function submitForm(formData){
	let data = {
		orgName: formData.orgName,
		contact: formData.contact,
		email: formData.email,
		townID: formData.townID,
		active: "1"
	};
	let resp = await axios.post('https://expressware.onrender.com/add_transporter', data)
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 submiting new transport vehicle:", error); }
	  else { console.error("Unknown error while submiting new transport vehicle:", error); }
	})
	.finally(() => {
		console.log("tried sending: ", formData);
	});
    return resp;
  };
  const handleSubmit = (e) => {
	e.preventDefault();
	if (ValidateString(formData.orgName, "Organization name") &&
		ValidateDropdown(formData.townID, "Town") &&
		ValidatePhone(formData.contact, "Phone number") &&
		ValidateEMail(formData.email, "E-mail")
		)
	{
		submitForm(formData).then(response => { 
			console.log("form submitted; response: ", response);
			window.alert(response.data["msg"]);
			transportersUpdate();
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
                  <h4 className='heading_form spanMainClr'>
                    REGISTER <span>TRANSPORTER</span>
                  </h4>
  
                  <div className='row mt-4'>
                    <div className='col-lg-4'>
                      <label htmlFor='orgName' className='label'>Organization name:</label><br/>
                      <input type='text' name='orgName' className='input_box_form' placeholder='Organization' value={formData.orgName} onChange={handleChange} />
                    </div>
                    <div className='col-lg-4'>
                      <label htmlFor='townID' className='label'>Town:</label><br/>
                      <select name='townID' className='input_box_form' value={formData.townID} onChange={handleChange}>
                        <option value=''>Choose town</option>
                        {towns.map((option) => (
                          <option key={option.id} value={option.id}>{option.townName}</option>
                        ))}
                      </select>
                    </div>
				  </div>
				  <div className='row mt-4'>
					<div className='col-lg-4'>
                      <label htmlFor='contact' className='label'>Phone number:</label><br />
                      <input type='text' name='contact' className='input_box_form' placeholder='' value={formData.contact} onChange={handleChange}/>
                    </div>
					<div className='col-lg-4'>
                      <label htmlFor='email' className='label'>E-mail:</label><br />
                      <input type='text' name='email' className='input_box_form' value={formData.email} onChange={handleChange}/>
                    </div>
                  </div>
                  <div className='row mt-4'>
                    <div className='col-lg-4'>
                      <a href='#' className='btn_form_submit' onClick={handleSubmit}>SUBMIT</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TransporterForm;
