import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {ValidateRegistration, ValidateString, ValidateDropdown} from './InfoValidation';


export default function VehicleForm ({transID, transName, vehiclesUpdate}) {
  const [formData, setFormData] = useState({
    registration: '',
    capacity: '',
    type: '',
    brand: '',
    model: '',
    active: '',
  });

  const [vehicleTypeOptions, setVehicleTypeOptions] = useState([]);
  useEffect(() => {
    getVehicleTypeOptions().then(options => setVehicleTypeOptions(options));
  }, []);
  
  const getVehicleTypeOptions = async () => {
	let resp = await axios.get('https://expressware.onrender.com/get_vehicle_type_info')
	.then((response) => { return response.data; } )
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 getting vehicle types:", error); }
	  else { console.error("Unknown error while getting vehicle types:", error); }
	});
	//console.log("vehicle types resp: ", resp);
	return resp;
  };
  
  // Capacity options
  const capacityOptions = Array.from({length: 10}, (_, i) => i + 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCheckboxChange = (e) => {
	setFormData({ ...formData, [e.target.name]: e.target.checked });
  };
  
  async function submitFormNewVehicle(formData){
	let data = {
		registration: formData.registration,
		capacity: formData.capacity,
		type: formData.type,
		brand: formData.brand,
		model: formData.model,
		transporter_id: transID,
		active: (formData.active == true ? "1" : "0")
	};
	let resp = await axios.post('https://expressware.onrender.com/add_transporter_vehicle', data)
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 submiting new transport vehicle:", error); }
	  else { console.error("Unknown error while submiting new transport vehicle:", error); }
	})
	;//.finally(() => { console.log("tried sending: ", data); });
    return resp;
};
  const handleSubmitNewVehicle = (e) => {
	e.preventDefault();
	if (ValidateRegistration(formData.registration) &&
		ValidateString(formData.brand, "Brand") &&
		ValidateString(formData.model, "Model") &&
		ValidateDropdown(formData.type, "Type") &&
		ValidateDropdown(formData.capacity, "Capacity")
		)
	{
		submitFormNewVehicle(formData).then(response => { 
			window.alert(response.data["msg"]);
			vehiclesUpdate();
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
                  <h4 className='heading_form spanMainClr'>
                    ADD <span>TRANSPORTER VEHICLE</span>
                  </h4>
				  <br/>
				  <h6 className='spanMainClr'>
					(Adding to <span>{transName}</span>)
				  </h6>
  
                  <div className='row mt-4'>
                    <div className='col-lg-4'>
                      <label htmlFor='registration' className='label'>Registration</label><br/>
                      <input type='text' name='registration' className='input_box_form' placeholder='Registration' value={formData.registration} onChange={handleChange}/>
                    </div>
					<div className='col-lg-4'>
                      <label htmlFor='brand' className='label'>Brand</label><br/>
                      <input type='text' name='brand' className='input_box_form' placeholder='Brand' value={formData.brand} onChange={handleChange}/>
                    </div>
                    <div className='col-lg-4'>
                      <label htmlFor='model' className='label'>Model</label><br/>
                      <input type='text' name='model' className='input_box_form' placeholder='Model' value={formData.model} onChange={handleChange}/>
                    </div>
                  </div>
                  <div className='row mt-4'>
					<div className='col-lg-4'>
                      <label htmlFor='type' className='label'>Type</label><br />
                      <select name='type' className='input_box_form' value={formData.type} onChange={handleChange} >
                        <option value=''>Choose Type</option>
                        {vehicleTypeOptions.map((option) => (
                          <option key={option.typeID} value={option.typeID}>{option.desc}</option>
                        ))}
                      </select>
                    </div>
					<div className='col-lg-4'>
                      <label htmlFor='capacity' className='label'>Capacity</label><br />
                      <select name='capacity' className='input_box_form' value={formData.capacity} onChange={handleChange} >
                        <option value=''>Choose Capacity</option>
                        {capacityOptions.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
					<div className='col-lg-4'>
					  <label htmlFor="active" className='label'>Available:</label>
					  <input type="checkbox" name="active" value={formData.active} onChange={handleCheckboxChange}/>
                    </div>
                  </div>
                  <div className='row mt-4'>
                    <div className='col-lg-4'>
                      <a href='#' className='btn_form_submit' onClick={handleSubmitNewVehicle}>REGISTER VEHICLE</a>
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
