import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import '../index.css';
import Navbar from "./Navbar";
import Footer from './Footer';
import PatientList from "./PatientList";
import PatientForm from "./PatientForm";
import axios from 'axios';


async function getUsers() {
  let resp = await axios.get('https://expressware.onrender.com/view_patients')
  .then(response => {
	  return response.data;
  })
  .catch(function (error) {
	if (error.response != undefined && error.response.status == 404) { console.log("Error 404 getting patients:", error); }
	else { console.log("Unknown error while getting patients:", error); }
  }); 
  //console.log("patients resp: ", resp);
  return resp;
}

async function getRoleOptions() {
	let resp = await axios.get('https://expressware.onrender.com/get_roles_info')
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 getting role options:", error); }
	  else { console.error("Unknown error while getting role options:", error); }
	});
	//console.log("role options resp.data: ", resp);
	return resp.data;
  };

const PatientManagement = () => {
	// Check for permissions
	let user = JSON.parse(localStorage.getItem("user"));
	let roles = user.roles;
	if (!user.roles.includes(3)) {  // Block
		return (
			<div>
				<Navbar />
				<h2 className="permission_block">You do not have permission to view this page.</h2>
				<Footer />
			</div>
		);
	}
	
	// Pass
	const [patients, setPatients] = useState([]);
	const [page, setPage] = useState([0, -1, 0]);

	const patientsUpdate = () => {
		getUsers().then(result => {
			//console.log("patients update", result);
			setPatients(result);
			let pageSize = 8;
			setPage([page[0], result == null ? 0 : ((result.length % pageSize == 0) ? (result.length / pageSize) : (Math.floor(result.length / pageSize) + 1)), pageSize]);
		});
		
	};
	useEffect(() => {
		patientsUpdate();
	}, []);


	return (
		<div>
		  <Navbar />
		  
		  <PatientList patients={patients} patientsUpdate={patientsUpdate} page={page} setPage={setPage}/>
		  <PatientForm patientsUpdate={patientsUpdate}/>
		  
		  <Footer />
		</div>
	);
}

export default PatientManagement;