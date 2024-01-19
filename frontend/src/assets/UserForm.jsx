import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import '../index.css';
import axios from 'axios';
// Validation
import {ValidatePIN, ValidatePhone, ValidateEMail, ValidateString, ValidateCheckArray} from './InfoValidation';


const UserForm = ({usersUpdate, roleOptions}) => {
  const [formData, setFormData] = useState({
    PIN: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    roleList: [],
  });

  useEffect(() => {
	roleOptions.map((r) => {formData.roleList[r.id] = false; });
  }, [roleOptions]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRoleCheckbox = (e) => {
	formData.roleList[e.target.value] = e.target.checked;
  };

  async function submitForm(formData) {
	const roles = [];
	roleOptions.map((role) => { if (formData.roleList[role.id]) { roles.push(role.id); } });
	let data = {
		PIN: formData.PIN,
		firstname: formData.firstname,
        lastname: formData.lastname,
		phone: formData.phone,
		email: formData.email,
		roleList: roles
	};
	let resp = await axios.post('https://expressware.onrender.com/add_admin', data)
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 submiting new user:", error); }
	  else { console.error("Unknown error while submiting new user:", error); }
	})
	;//.finally(() => { console.log("tried sending: ", data); });
	return resp;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
	let indsToCheck = []; roleOptions.map((r) => indsToCheck.push(r.id));
	// Validate client-side info
	if (ValidatePIN(formData.PIN) &&
		ValidateString(formData.firstname, "First name") &&
		ValidateString(formData.lastname, "Last name") &&
		ValidatePhone(formData.phone) &&
		ValidateEMail(formData.email) &&
		ValidateCheckArray(formData.roleList, indsToCheck, "Role"))
	{
		submitForm(formData).then(response => { 
			window.alert(response.data["msg"]);
			usersUpdate();
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
					<h4 className='heading_form spanMainClr'>CREATE <span> USER </span></h4>
					
					<div className='row mt-4'>
					  <div className='col-lg-4'>
						<label htmlFor="" className='label'>PIN:</label><br />
						<input type='text' name='PIN' className='input_box_form' value={formData.PIN} onChange={handleChange} />
					  </div>
					  <div className='col-lg-4'>
					  <label htmlFor="" className='label'>Firstname:</label><br />
						<input type='text' name='firstname' className='input_box_form' value={formData.firstname} onChange={handleChange} />
					  </div>
					  <div className='col-lg-4'>
					  <label htmlFor="" className='label'>Lastname:</label><br />
						<input type='text' name='lastname' className='input_box_form' value={formData.lastname} onChange={handleChange} />
					  </div>
	  
					  <div className='col-lg-4'>
						<label htmlFor="" className='label'>Phone:</label><br />
						<input type='text' name='phone' className='input_box_form' value={formData.phone} onChange={handleChange} />
					  </div>
					  <div className='col-lg-4'>
						<label htmlFor="" className='label'>Email:</label><br />
						<input type='text' name='email' className='input_box_form' value={formData.email} onChange={handleChange} />
					  </div>
					  
					  <div className='col-lg-4'>
						<label htmlFor="" className='label'>Roles:</label><br />
						<div className='checkbox-list'>
							<div name="admin_smjestaja" className="checkbox-div">
								<label htmlFor="admin_smjestaja" className='label'>Administrator smještaja</label>
								<input type="checkbox" name="admin_smjestaja" value="1" onClick={handleRoleCheckbox}/>
							</div>
							<div name="admin_prijevoza" className="checkbox-div">
								<label htmlFor="admin_prijevoza" className='label'>Administrator prijevoza</label>
								<input type="checkbox" name="admin_prijevoza" value="2" onClick={handleRoleCheckbox}/>
							</div>
							<div name="korisnicki_admin" className="checkbox-div">
								<label htmlFor="korisnicki_admin" className='label'>Korisnicki administrator</label>
								<input type="checkbox" name="korisnicki_admin" value="3" onClick={handleRoleCheckbox}/>
							</div>
						</div>
					  </div>
					  
					<div className='col-lg-4'>
					  <a href='/' className='btn_form_submit btn_form_submit_left' onClick={handleSubmit}>CREATE USER</a>
					</div>
					</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
  );
}

export default UserForm;