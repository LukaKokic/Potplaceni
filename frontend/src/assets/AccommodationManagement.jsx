import React, { useState, useEffect } from 'react';
import '../index.css';
import Navbar from "./Navbar";
import Footer from './Footer';
import AccommodationList from "./AccommodationList";
import AccommodationForm from "./AccommodationForm";
import axios from 'axios';
// Validation
import {ValidateNumber, ValidateString, ValidateDropdown} from './InfoValidation';


async function getAccs(){
	let resp = await axios.get('https://expressware.onrender.com/view_accommodations')
	.then(response => {
		return response.data;
	})
	.catch(function (error) {
		if (error.response != undefined && error.response.status == 404) { console.log("Error 404 getting users:", error); }
		else { console.log("Unknown error while getting users:", error); }
	}); 
	//console.log("accs resp: ", resp);
	return resp;
};

const AccommodationManagement = () => {
	// Check for permissions
	let user = JSON.parse(localStorage.getItem("user"));
	let roles = user.roles;
	if (!user.roles.includes(1)) {  // Block
		return (
			<div>
				<Navbar />			
				<h2 className="permission_block">You do not have permission to view this page.</h2>
				<Footer />
			</div>
		);
	}
	
	// Pass
	const [accs, setAccs] = useState([]);
	const [page, setPage] = useState([0, -1, 0]);
  
	const accsUpdate = () => {
		getAccs().then(result => { 
			// Set accs
			setAccs(result);
			//console.log("accs update", result, "->", newAccs);
			let pageSize = 8;
			setPage([page[0], result == null ? 0 : ((result.length % pageSize == 0) ? (result.length / pageSize) : (Math.floor(result.length / pageSize) + 1)), pageSize]);
		});
	};
	useEffect(() => {
		accsUpdate();
	}, []);


	return (
		<div>
			<Navbar />
	  
			<AccommodationList accs={accs} accsUpdate={accsUpdate} page={page} setPage={setPage}/>
			<AccommodationForm accsUpdate={accsUpdate}/>
	  
			<Footer />
		</div>
	);
}

export default AccommodationManagement;
