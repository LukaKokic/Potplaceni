import React, {useState, useEffect, useRef, Label} from 'react'
import './list.css';
import axios from 'axios';

async function deletePatient(id) {
	//console.log("deleting", id);
	let resp = await axios.post('https://expressware.onrender.com/delete_patient', { id: id })
	.catch((error) => {
		if (error != null) { console.error("Error " + error.response.status + " deleting patient:", error); }
		else { console.error("Unknown error while deleting user:", error); }
	})
	.then((response) => { return response; });
	return resp;
}
async function getPatientTreatment(id) {
	//console.log("fetching patient treatment", id);
	let resp = await axios.get('https://expressware.onrender.com/view_patient_treatment/' + id)
	.catch((error) => {
		if (error.response.status == 404) { console.error("Error 404 getting patient info:", error); }
		else { console.error("Unknown error getting patient info:", error); }
	})
	.then((response) => { return response; });
	//console.log(resp);
	return resp;
}

function displayPatient(data, index, page, isOpen, openFunc, delFunc, getPatTreat) {
	// Check if in page
	if (index < (page[0] * page[2]) || index > ((page[0] * page[2]) + page[2] - 1)) { return null; }
	
	return (
		<div key={data.patientID} className='row mt-4'>
			<div className="dropdown">
				{isOpen == index ? (
				<div>
					<button value={index} onClick={((e) => openFunc(e, index))}>
						<div className="item-title">{data.fName} {data.lName}</div>
						<ul className="dropdown-list">
							<li className="dropdown-list-item">
								<p><b>PIN</b>: {data.PIN}</p>
							</li>
							<li className="dropdown-list-item">
								<p><b>Phone number</b>: {data.contact}</p>
							</li>
							<li className="dropdown-list-item">
								<p><b>E-mail</b>: {data.email}</p>
							</li>
							<li className="dropdown-list-item">
								<p><b>Home address</b>: {data.HomeAddress}</p>
							</li>
						</ul>
					</button>
					<br/>
					<button className='btn_form_delete_red' onClick={((e) => delFunc(e, data.patientID))}>DELETE</button>
					<button className='btn_form_modify_gray' onClick={((e) => getPatTreat(e, data.patientID))}>TREATMENT INFO</button>
				</div>) : (
					<button value={index} onClick={((e) => openFunc(e, index))}>
						{data.lName}, {data.fName}
					</button>)}
			</div>
		</div>
	);
}



export default function UserList({patients, patientsUpdate, page, setPage}) {
	//const [patients, setPatients] = useState([]);
	const [isOpen, setIsOpen] = useState(-1);
	
	const handleDelete = (e, id) => {
		//console.log("handleDelete ", id);
		deletePatient(id)
		.catch((error) => {
			console.error("Error deleting patient (id ", id, ")");
		})
		.then((result) => {
			setIsOpen(-1);
			patientsUpdate();
		});
	};
	const handleGetPatientTreatment = (e, id) => {
		getPatientTreatment(id)
		.catch((error) => {
			console.error("Error getting patient treatment info (id ", id, ")");
		})
		.then((response) => {
			let treat = response.data[0];
			window.alert("Tretman:   " + treat.tName + "\nKlinika:      " + treat.cName + "\nTermin:      " + treat.treatmentDate);
		});
	}
	
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
								<h4 className='heading_form spanMainClr'>PATIENTS</h4>
								
								{ patients == null ? (<div className='row mt-4'>No patients registered.</div>) : (patients.length == 0 ? 
									<div className='row mt-4'>Fetching patients...</div> : 
									patients.map((item, index) => (displayPatient(item, index, page, isOpen, handleOpen, handleDelete, handleGetPatientTreatment)))) 
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
