import React, {useState, useEffect, useRef, Label} from 'react'
import './list.css';
import axios from 'axios';
import OLMap from './map';

async function deleteAcc(id) {
	//console.log("deleting", id);
	let resp = await axios.post('https://expressware.onrender.com/delete_accommodation', { id: id })
	.catch((error) => {
		if (error.response.status == 404) { console.error("Error 404 deleting user:", error); }
		else { console.error("Unknown error while deleting user:", error); }
	})
	.then((response) => { return response; });
	return resp;
}
async function activateAcc(id, val) {
	//console.log("activateAcc", id, val);
	let resp = await axios.post('https://expressware.onrender.com/update_accommodation_avaliability', 
		{ id: id, avaliable: (val == true ? "1" : "0") }
	)
	.catch((error) => {
		if (error.response.status == 404) { console.error("Error 404 activating accommodation:", error); }
		else { console.error("Unknown error while activating accommodation:", error); }
	})
	.then((response) => { return response; });
	return resp;
}

function displayAcc(data, index, page, isOpen, openFunc, delFunc, activeFunc) {
	// Check if in page
	if (index < (page[0] * page[2]) || index > ((page[0] * page[2]) + page[2] - 1)) { return null; }
	
	return (
		<div key={data.id} className='row mt-4'>
			<div className="dropdown">
				{isOpen == index ? (
				// Open
				<div>
						<div value={index}>
						<button className="item-title" value={index} onClick={((e) => openFunc(e, index))}>{data.address}, {data.tPostal} {data.tName}</button>
						<ul className="dropdown-list">
							<li className="dropdown-list-item">
								<p><b>Real Estate ID</b>: {data.re_id}</p>
							</li>
							<li className="dropdown-list-item">
								<p><b>Type</b>: {data.acc_type}</p>
							</li>
							<li className="dropdown-list-item">
								<p><b>Equipment</b>: {data.acc_eq}</p>
							</li>
							<li className="dropdown-list-item">
								<label htmlFor="activeBox" className="list-label"><b>Active</b>:</label>
								<input id="item_activeCheckbox" disabled type="checkbox" name="activeBox" defaultChecked={data.active == "1"}/>
							</li>
						</ul>
						<div>
							<OLMap longitude={data.long} latitude={data.lat}/>
						</div>
					</div>
					<br/>
					<button className='btn_form_delete_red' onClick={((e) => delFunc(e, data.id))}>DELETE</button>
					<button className='btn_form_modify_gray' onClick={((e) => activeFunc(e, data.id, data.active == "0", data))}>{data.active == "1" ? "DEACTIVATE" : "ACTIVATE"}</button>
				</div>
					) : (
				// Closed
					<button value={index} onClick={((e) => openFunc(e, index))}>
						{data.address}, {data.tName}
					</button>)}
			</div>
		</div>
	);
}



export default function AccommodationList({accs, accsUpdate, page, setPage}) {
	const [isOpen, setIsOpen] = useState(-1);
	
	const handleDelete = (e, id) => {
		//console.log("handleDelete ", id);
		deleteAcc(id)
		.catch((error) => {
			console.error("Error deleting accommodation (id ", id, ")");
		})
		.then((result) => {
			//window.alert("Accommodation successfully deleted.");
			setIsOpen(-1);
			accsUpdate();
		});
	};
	const handleActivate = (e, id, val, data) => {
		activateAcc(id, val)
		.catch((error) => {
			console.error("Error activating acc (id ", id, ")", error);
		})
		.then((response) => {
			document.getElementById("item_activeCheckbox").checked = val;
			accsUpdate();
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
								<h4 className='heading_form'>ACCOMMODATIONS</h4>
								
								{ accs == null ? (<div className='row mt-4'>No accommodations registered.</div>) : (accs.length == 0 ? 
									<div className='row mt-4'>Fetching accommodations...</div> : 
									accs.map((item, index) => (displayAcc(item, index, page, isOpen, handleOpen, handleDelete, handleActivate)))) 
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
