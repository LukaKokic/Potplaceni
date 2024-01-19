import React, {useState, useEffect, Label} from 'react'
import {useNavigate} from 'react-router-dom';
import './list.css';
import axios from 'axios';

async function deleteTransporter(id) {
	console.log("deleting", id);
	let resp = await axios.post('https://expressware.onrender.com/delete_transporter', { id: id })
	.catch((error) => {
		if (error != null) { console.error("Error " + error.response.status + " deleting transporter:", error); }
		else { console.error("Unknown error while deleting transporter:", error); }
	})
	.then((response) => { return response; });
	return resp;
}

function displayTransporter(data, index, page, isOpen, openFunc, delFunc, vehFunc) {
	// Check if in page
	if (index < (page[0] * page[2]) || index > ((page[0] * page[2]) + page[2] - 1)) { return null; }
	
	return (
		<div key={data.id} className='row mt-4'>
			<div className="dropdown">
				{isOpen == index ? (
				<div>
					<button value={index} onClick={((e) => openFunc(e, index))}>
						<div className="item-title">{data.name}</div>
						<ul className="dropdown-list">
							<li className="dropdown-list-item">
								<p><b>Phone number</b>: {data.phone}</p>
							</li>
							<li className="dropdown-list-item">
								<p><b>E-mail</b>: {data.email}</p>
							</li>
						</ul>
					</button>
					<br/>
					<button className='btn_form_delete_red' onClick={((e) => delFunc(e, data.id))}>DELETE</button>
					<button className='btn_form_modify_gray' onClick={((e) => vehFunc(e, index, data.id))}>VIEW VEHICLES</button>
				</div>) : (
					<button value={index} onClick={((e) => openFunc(e, index))}>
						{data.name}
					</button>)}
			</div>
		</div>
	);
}



export default function TransporterList({transporters, transportersUpdate, page, setPage}) {
	//const [transporters, setTransporters] = useState([]);
	const [isOpen, setIsOpen] = useState(-1);
	
	const handleDelete = (e, id) => {
		//console.log("handleDelete ", id);
		deleteTransporter(id)
		.catch((error) => {
			console.error("Error deleting transporter (id ", id, ")");
		})
		.then((result) => {
			setIsOpen(-1);
			transportersUpdate();
		});
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
	
	const navigate = useNavigate();
	const handleViewVehicles = (e, index, id) => {
		console.log("view vehicles of id = ", id);
		navigate("/vehicle-management/" + id + "?name=" + transporters[index].name);
	}
	
	return (
		<div className='container_list'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-12 parent_container_content_form'>
						<div className='content_form'>
							<div className='container'>
								<h4 className='heading_form accommodation'>TRANSPORTERS</h4>
								
								{ transporters == null ? (<div className='row mt-4'>No transporters registered.</div>) : (transporters.length == 0 ? 
									<div className='row mt-4'>Fetching transporters...</div> : 
									transporters.map((item, index) => (displayTransporter(item, index, page, isOpen, handleOpen, handleDelete, handleViewVehicles)))) 
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
