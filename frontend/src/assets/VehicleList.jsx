import React, {useState, useEffect, Label} from 'react'
import './list.css';
import axios from 'axios';

async function deleteVehicle(id) {
	//console.log("deleting", id);
	let resp = await axios.post('https://expressware.onrender.com/delete_transporter_vehicle', { id: id })
	.catch((error) => {
		if (error != null) { console.error("Error " + error.response.status + " deleting transporter:", error); }
		else { console.error("Unknown error while deleting transporter:", error); }
	})
	.then((response) => { return response; });
	return resp;
}
async function setAvailableVehicle(id, val) {
	//console.log("setAvailableVehicle", id, val);
	let resp = await axios.post('https://expressware.onrender.com/update_vehicle_avaliability',
		{ id: id, avaliable: (val == true ? "1" : "0") }
	)
	.catch((error) => {
		if (error.response.status == 404) { console.error("Error 404 activating transporter:", error); }
		else { console.error("Unknown error while activating transporter:", error); }
	})
	.then((response) => { return response; });
	return resp;
}

function displayVehicle(data, index, page, isOpen, openFunc, delFunc, availFunc) {
	// Check if in page
	if (index < (page[0] * page[2]) || index > ((page[0] * page[2]) + page[2] - 1)) { return null; }
	
	return (
		<div key={data.vehicleID} className='row mt-4'>
			<div className="dropdown">
				{isOpen == index ? (
				<div>
					<button value={index} onClick={((e) => openFunc(e, index))}>
						<div className="item-title">{data.registration}</div>
						<ul className="dropdown-list">
							<li className="dropdown-list-item">
								<p><b>Car model:</b>: {data.brand}, {data.model}</p>
							</li>
							<li className="dropdown-list-item">
								<p><b>Type</b>: {data.type}</p>
							</li>
							<li className="dropdown-list-item">
								<p><b>Capacity</b>: {data.capacity}</p>
							</li>
							<li className="dropdown-list-item">
								<label htmlFor="activeBox" className="list-label"><b>Available</b>:</label>
								<input id="item_activeCheckbox" disabled type="checkbox" name="activeBox" defaultChecked={data.active == "1"}/>
							</li>
						</ul>
					</button>
					<br/>
					<button className='btn_form_delete_red' onClick={((e) => delFunc(e, data.vehicleID))}>DELETE</button>
					<button className='btn_form_modify_gray' onClick={((e) => availFunc(e, data.vehicleID, data.active == "0"))}>{data.active == "1" ? "SET UNAVAILABLE" : "SET AVAILABLE"}</button>
				</div>) : (
					<button value={index} onClick={((e) => openFunc(e, index))}>
						{data.registration}
					</button>)}
			</div>
		</div>
	);
}



export default function VehicleList({transID, vehicles, vehiclesUpdate, page, setPage}) {
	//const [vehicles, setVehicles] = useState([]);
	const [isOpen, setIsOpen] = useState(-1);
	
	const handleDelete = (e, id) => {
		deleteVehicle(id)
		.catch((error) => {
			console.error("Error deleting vehicle (id ", id, ")");
		})
		.then((result) => {
			setIsOpen(-1);
			vehiclesUpdate();
		});
	};
	const handleAvailable = (e, id, val) => {
		setAvailableVehicle(id, val)
		.catch((error) => {
			console.error("Error setting vehicle (un)available (id ", id, ")", error);
		})
		.then((response) => {
			document.getElementById("item_activeCheckbox").checked = val;
			vehiclesUpdate();
		});;
	};
	
	const handleOpen = (e, index) => {
		setIsOpen(isOpen == index ? -1 : index);
	};
	const handlePageChange = (e) => {
		let delta = e.target.value;
		if (delta == -1 && page[0] > 0) 
			{ setPage([page[0] - 1, page[1], page[2]]); setIsOpen(-1); }
		else if (delta == 1 && page[0] < page[1] - 1) 
			{ setPage([page[0] + 1, page[1], page[2]]); setIsOpen(-1); }
	};
	
	return (
		<div className='container_list'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-12 parent_container_content_form'>
						<div className='content_form'>
							<div className='container'>
								<h4 className='heading_form accommodation'>VEHICLES</h4>
								
								{ vehicles == null ? (<div className='row mt-4'>No vehicles registered.</div>) : (vehicles.length == 0 ? 
									<div className='row mt-4'>Fetching vehicles...</div> : 
									vehicles.map((item, index) => (displayVehicle(item, index, page, isOpen, handleOpen, handleDelete, handleAvailable)))) 
								}
							</div>
							{ page[1] > 1 ? (
								<div className='page-select-container'>
									{ page[0] > 0 ? (
										<button type="button" className="btn_page_change" value="-1" onClick={handlePageChange}>-</button>
										) : (
										<button type="button" className="btn_page_change_disabled" value="-1" onClick={handlePageChange} disabled>-</button>
										)
									}
									<label>{page[0] + 1} / {page[1]}</label>
									{ page[0] < page[1] - 1 ? (
										<button type="button" className="btn_page_change" value="1" onClick={handlePageChange}>+</button>
										) : (
										<button type="button" className="btn_page_change_disabled" value="1" onClick={handlePageChange} disabled>+</button>
										)
									}
								</div>
							) : (<div/>)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
