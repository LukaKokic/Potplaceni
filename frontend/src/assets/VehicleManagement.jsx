import React, { useState, useEffect } from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import '../index.css';
import Navbar from "./Navbar";
import Footer from './Footer';
import VehicleList from "./VehicleList";
import VehicleForm from "./VehicleForm";
import axios from 'axios';


async function getVehicles(transId) {
  let resp = await axios.get('https://expressware.onrender.com/view_transporter_vehicles/' + transId)
  .then(response => {
	  return response.data;
  })
  .catch(function (error) {
	if (error != null) { console.error("Error " + error.response.status + " getting vehicles:", error); }
	else { console.log("Unknown error while getting vehicles:", error); }
  }); 
  //console.log("vehicles resp: ", resp);
  return resp;
}

export default function VehicleManagement() {
	// Get ID
	let transID = useParams().transID;
	// Get name
	const [queryParameters] = useSearchParams();
	let transName = queryParameters.get("name");
	
	const [vehicles, setVehicles] = useState([]);
	const [page, setPage] = useState([0, -1, 0]);

	const vehiclesUpdate = () => {
		getVehicles(transID).then(result => {
			//console.log("vehicles update", result);
			setVehicles(result);
			let pageSize = 6;
			setPage([page[0], result == null ? 0 : ((result.length % pageSize == 0) ? (result.length / pageSize) : (Math.floor(result.length / pageSize) + 1)), pageSize]);
		});
	};
	useEffect(() => {
		vehiclesUpdate();
	}, []);


	return (
		<div>
			<Navbar />
			
			<h2 className="title spanMainClr"><span>{transName}</span></h2>
		  
			<VehicleList transID={transID} vehicles={vehicles} vehiclesUpdate={vehiclesUpdate} page={page} setPage={setPage}/>
			
			<VehicleForm transID={transID} transName={transName} vehiclesUpdate={vehiclesUpdate}/>
		  
			<Footer />
		</div>
	);
};