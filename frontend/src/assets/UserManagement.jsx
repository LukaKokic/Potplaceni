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
    rolelist: [],
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
        { id: 1, type: 'ERROR GETTING ROLES' }
      ];
	});
	//console.log("role options resp: ", resp);
	return resp;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function submitForm(formData) {
	let resp = await axios.post('https://expressware.onrender.com/add_admin', {
		params: formData
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

  const handleDeletePatient = () => {
    setDeleteModalOpen(false);
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
					  <div className='col-lg-12'>
						<a href='/' className='btn_form_submit btn_form_submit_left'>VIEW PATIENTS</a>
					  </div>
					</div>
					
					<div className='row mt-4'>
					  <div className='col-lg-4'>
						<label htmlFor="" className='label'>PIN:</label><br />
						<input type='text' name='pin' className='input_box_form' value={formData.PIN} onChange={handleChange} />
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
						<label htmlFor="" className='label'>Email:</label><br />
						<input type='text' name='email' className='input_box_form' value={formData.email} onChange={handleChange} />
					  </div>
					  <div className='col-lg-4'>
						<label htmlFor="" className='label'>Rolelist:</label><br />
						<select name='roleID' className='input_box_form' value={formData.roleList} onChange={handleChange}>
						  <option value="">Choose Type</option>
						  {roleOptions.map(option => (
							<option key={option.id} value={option.id}>{option.type}</option>
						  ))}
						</select>
					  </div>
					
					  </div>
					<div className='col-lg-4'>
					  <a href='/' className='btn_form_submit btn_form_submit_left' onClick={handleSubmit}>SUBMIT NOW</a>
					</div>
					
					<div className='row mt-4'>
					  <div className='col-lg-4'>
					  </div>
					  <div className='col-lg-4'>
						<button className='btn_form_delete_red' onClick={handleDeleteClick}>DELETE</button>
					  </div>
					</div>
					
					{isDeleteModalOpen && (
					  <div className='delete-modal' style={{ position: 'right', top: '20px', right: '10px', width: '300px', padding: '20px' }}>
						<div className='modal-content'>
						<span className='close' onClick={() => setDeleteModalOpen(false)}>&times;</span>
						<label htmlFor="deleteAccommodationId">Enter Patient ID to delete:</label>
						<input type="text" id="deleteAccommodationId" value={deletePatientId} onChange={(e) => setDeletePatientId(e.target.value)} />
						<button onClick={handleDeletePatient}>Delete</button>
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

export default UserManagement;
