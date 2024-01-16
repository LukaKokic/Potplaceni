import React, { useState, useEffect } from 'react';
import '../index.css';
import Navbar from "./Navbar";
import UserList from "./UserList";
import axios from 'axios';

async function getData(){
  let resp = await axios.get('https://expressware.onrender.com/view_admin');
  return resp;
}


const UserManagement = () => {
  const [formData, setFormData] = useState({
    PIN: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    roleList: [],
  });
  
  const [roleOptions, setRoleOptions] = useState([]);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletePatientId, setDeletePatientId] = useState('');

  useEffect(() => {
    // Pozovi funkcije za dohvaćanje opcija iz baze i postavi ih u state
    getRoleOptions().then(options => setRoleOptions(options));
  }, []); // Ovisno o potrebama i funkcijama koje su dostupne

  const getRoleOptions = async () => {
	let resp = await axios.get('https://expressware.onrender.com/get_roles_info')
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 getting role options:", error); }
	  else { console.error("Unknown error while getting role options:", error); }
	  return [
        { id: 1, rName: 'ERROR GETTING ROLES' }
      ];
	});
	//console.log("role options resp.data: ", resp);
	return resp.data;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRoleCheckbox = (e) => {
	formData.roleList[e.target.value] = e.target.checked;
  };

  async function submitForm(formData) {
	const roles = [];
	formData.roleList.map((val, index) => {
		if (val) {
			roles.push(index);
		}
	});
	let resp = await axios.post('https://expressware.onrender.com/add_admin', {
		  PIN: formData.PIN,
		  firstname: formData.firstname,
          lastname: formData.lastname,
		  phone: formData.phone,
		  email: formData.email,
		  roles: roles
	  })
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 submiting new user:", error); }
	  else { console.error("Unknown error while submiting new user:", error); }
	})
	.finally(() => {
		console.log("tried sending: ", formData);
	});
	return resp;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
	submitForm(formData).then(response => console.log("form submitted; response: ", response));
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };


  

  return (
    <div>
      <Navbar />
	  
	  <UserList />
	  
		<div className='form_container_accommodation'>
		  <div className='container'>
			<div className='row'>
			  <div className='col-lg-12 parent_container_content_form'>
				<div className='content_form'>
				  <div className='container'>
					<h4 className='heading_form accommodation'>CREATE <span> USER </span></h4>
					
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
								<input type="checkbox" name="admin_smjestaja" value="0" onClick={handleRoleCheckbox}/>
							</div>
							<div name="admin_prijevoza" className="checkbox-div">
								<label htmlFor="admin_prijevoza" className='label'>Administrator prijevoza</label>
								<input type="checkbox" name="admin_prijevoza" value="1" onClick={handleRoleCheckbox}/>
							</div>
							<div name="admin_prijevoza" className="checkbox-div">
								<label htmlFor="smjestajni_admin" className='label'>Korisnicki administrator</label>
								<input type="checkbox" name="admin_prijevoza" value="2" onClick={handleRoleCheckbox}/>
							</div>
						</div>
					  </div>
					  
					<div className='col-lg-4'>
					  <a href='/' className='btn_form_submit btn_form_submit_left' onClick={handleSubmit}>SUBMIT NOW</a>
					</div>
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

export default UserManagement;


/*
<div className='col-lg-4'>
						<label htmlFor="" className='label'>Rolelist:</label><br />
						<select name='roleID' className='input_box_form' value={formData.roleList} onChange={handleChange}>
						  <option value="">Choose Type</option>
						  {roleOptions.map(option => (
							<option key={option.id} value={option.id}>{option.rName}</option>
						  ))}
						</select>
					  </div>
*/