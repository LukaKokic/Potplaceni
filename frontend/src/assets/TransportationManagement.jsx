import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import '../index.css';
import Navbar from "./Navbar";
import Footer from './Footer';
import TransporterList from "./TransporterList";
import TransporterForm from "./TransporterForm";
import axios from 'axios';


async function getTransporters() {
  let resp = await axios.get('https://expressware.onrender.com/view_transporters')
  .then(response => {
	  return response.data;
  })
  .catch(function (error) {
	if (error.response != undefined && error.response.status == 404) { console.log("Error 404 getting patients:", error); }
	else { console.log("Unknown error while getting patients:", error); }
  }); 
  //console.log("transporters resp: ", resp);
  return resp;
}

export default function TransportationManagement () {
	// Check for permissions
	let user = JSON.parse(localStorage.getItem("user"));
	let roles = user.roles;
	if (!user.roles.includes(2)) {  // Block
		return (
			<div>
				<Navbar />			
				<h2 className="permission_block">You do not have permission to view this page.</h2>
				<Footer />
			</div>
		);
	}
	
	// Pass
	const [transporters, setTransporters] = useState([]);
	const [page, setPage] = useState([0, -1, 0]);

	const transportersUpdate = () => {
		getTransporters().then(result => {
			//console.log("transporters update", result);
			setTransporters(result);
			let pageSize = 8;
			setPage([page[0], result == null ? 0 : ((result.length % pageSize == 0) ? (result.length / pageSize) : (Math.floor(result.length / pageSize) + 1)), pageSize]);
		});
	};
	useEffect(() => {
		transportersUpdate();
	}, []);

	return (
		<div>
		  <Navbar />
		  
		  <TransporterList transporters={transporters} transportersUpdate={transportersUpdate} page={page} setPage={setPage}/>
		  <TransporterForm transportersUpdate={transportersUpdate}/>
		  
		  <Footer />
		</div>
	);
};