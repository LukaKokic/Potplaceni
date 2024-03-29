import React, {useState, useEffect, useRef, Label} from 'react'
import './list.css';
import axios from 'axios';
import {ValidatePhone, ValidateEMail, ValidateCheckArray, ValidateString} from './InfoValidation';

async function deleteUser(id) {
	//console.log("deleting", id);
	let resp = await axios.post('https://expressware.onrender.com/delete_admin', { userID: id })
	.catch((error) => {
		if (error.response.status == 404) { console.error("Error 404 deleting user:", error); }
		else { console.error("Unknown error while deleting user:", error); }
	})
	.then((response) => { return response; });
	return resp;
};
async function modifyUser(newData, roleOptions) {
	//console.log("modifying", newData);
	const roles = [];
	roleOptions.map((role) => { if (newData.roleList[role.id]) { roles.push(role.id); } });
	let resp = await axios.post('https://expressware.onrender.com/update_admin_info', {
		userID: newData.userID,
		phone: newData.phone,
		email: newData.email,
		roleList: roles
	})
	.catch((error) => {
		if (error.response.status == 404) { console.error("Error 404 modifying user:", error); }
		else { console.error("Unknown error while modifying user:", error); }
		return error;
	})
	.then((response) => { return response; });
	return resp;
};
async function changePass(id, newPass) {
	console.log("changingPass:", id, newPass);
	let resp = await axios.post('https://expressware.onrender.com/change_password', {
		userID: id,
		pass: newPass
	})
	.catch((error) => {
		if (error.response.status == 404) { console.error("Error 404 modifying user:", error); }
		else { console.error("Unknown error while modifying user:", error); }
		return error;
	})
	.then((response) => { return response; });
	console.log("response:", resp);
	return resp;
}

function displayUser(data, index, page, roleOptions, isOpen, openFunc, delFunc, isModFunc, modding, modFunc, newData, setNewData, setModding) {
	// Check if in page
	if (index < (page[0] * page[2]) || index > ((page[0] * page[2]) + page[2] - 1)) { return null; }
	
	// Modifying values
	if (isOpen == index && modding[0] && modding[1]) {
		let roleList = [undefined, 
						data.roles.includes(roleOptions[0].rName), 
						data.roles.includes(roleOptions[1].rName), 
						data.roles.includes(roleOptions[2].rName)];
		setNewData({
			userID: data.id,
			phone: data.phone,
			email: data.email,
			roleList: roleList
		});
		setModding([modding[0], false]);
	}
	const handleChange = (e) => {
		setNewData({ ...newData, [e.target.name]: e.target.value });
	};
	const handleRoleCheckbox = (e) => {
		newData.roleList[e.target.value] = e.target.checked;
	};
	
	const newPass = {
		userID: data.id,
		pass: ""
	};
	
	return (
		<div key={data.id} className='row mt-4'>
			<div className="dropdown">
				{isOpen == index ? (
				modding[0] ? (
				<div>
					<div className="item-title">{data.fName} {data.lName}</div>
					<div className='row mt-4'>
						<div className='col-lg-4'>
							<label htmlFor="phone" className='label'>Phone number:</label>
							<input type='text' name='phone' className='input_box_form' value={newData.phone} onChange={handleChange}/>
						</div>
						<div className='col-lg-4'>
							<label htmlFor="email" className='label'>E-mail:</label>
							<input type='text' name='email' className='input_box_form' value={newData.email} onChange={handleChange}/>
						</div>
						
						<div className='col-lg-4'>
						<label htmlFor="" className='label'>Roles:</label><br />
						<div className='checkbox-list'>
							<div name="admin_smjestaja" className="checkbox-div">
								<label htmlFor="admin_smjestaja" className='label'>Administrator smještaja</label>
								<input type="checkbox" name="admin_smjestaja" value="1" onClick={handleRoleCheckbox} defaultChecked={newData.roleList[1]}/>
							</div>
							<div name="admin_prijevoza" className="checkbox-div">
								<label htmlFor="admin_prijevoza" className='label'>Administrator prijevoza</label>
								<input type="checkbox" name="admin_prijevoza" value="2" onClick={handleRoleCheckbox} defaultChecked={newData.roleList[2]}/>
							</div>
							<div name="admin_prijevoza" className="checkbox-div">
								<label htmlFor="smjestajni_admin" className='label'>Korisnicki administrator</label>
								<input type="checkbox" name="admin_prijevoza" value="3" onClick={handleRoleCheckbox} defaultChecked={newData.roleList[3]}/>
							</div>
						</div>
					  </div>
					</div>
					
					<br/>
					<button className='btn_form_confirm_blue' onClick={((e) => modFunc(e, index, newData))}>CONFIRM</button>
					<button className='btn_form_modify_gray' onClick={((e) => isModFunc(e, index))}>CANCEL</button>
				</div>
				) : (
				<div>
					<button value={index} onClick={((e) => openFunc(e, index))}>
						<div className="item-title">{data.fName} {data.lName}</div>
						<ul className="dropdown-list">
							<li className="dropdown-list-item">
								<p>PIN: {data.PIN}</p>
							</li>
							<li className="dropdown-list-item">
								<p>Phone number: {data.phone}</p>
							</li>
							<li className="dropdown-list-item">
								<p>E-mail: {data.email}</p>
							</li>
							<li className="dropdown-list-item">
								<p>Roles:</p>
								<ul> {
									data.roles.map(function(item, i) {
										return (<li key={i}><label>{item}</label><br/></li>);
									})
								}
								</ul>
							</li>
						</ul>
					</button>
					<br/>
					<button className='btn_form_delete_red' onClick={((e) => delFunc(e, index))}>DELETE</button>
					<button className='btn_form_modify_gray' onClick={((e) => isModFunc(e, index))}>MODIFY</button>
					<button className='btn_form_submit' onClick={((e) => isPassFunc(e, index))}>CHANGE PASSWORD</button>
				</div>
					)) : (
					<button value={index} onClick={((e) => openFunc(e, index))}>
						{data.lName}, {data.fName}
					</button>)}
			</div>
		</div>
	);
};
function displayClosedUser(data, index, openFunc) {
	return (
		<div key={data.id} className='row mt-4'>
			<div className="dropdown">
				<button value={index} onClick={((e) => openFunc(e, index))}>
					{data.lName}, {data.fName}
				</button>
			</div>
		</div>);
}
function displayOpenUser(data, index, openFunc, delFunc, isModFunc) {
	return (
		<div key={data.id} className='row mt-4'>
			<div className="dropdown">
				<button value={index} onClick={((e) => openFunc(e, index))}>
				<div className="item-title">{data.fName} {data.lName}</div>
				<ul className="dropdown-list">
					<li className="dropdown-list-item">
						<p>PIN: {data.PIN}</p>
					</li>
					<li className="dropdown-list-item">
						<p>Phone number: {data.phone}</p>
					</li>
					<li className="dropdown-list-item">
						<p>E-mail: {data.email}</p>
					</li>
					<li className="dropdown-list-item">
						<p>Roles:</p>
						<ul> {
							data.roles.map(function(item, i) {
								return (<li key={i}><label>{item}</label><br/></li>);
							})
						}
						</ul>
					</li>
				</ul>
				</button>
				<br/>
				<button className='btn_form_delete_red' onClick={((e) => delFunc(e, index))}>DELETE</button>
				<button className='btn_form_modify_gray' onClick={((e) => isModFunc(e, index, 1))}>MODIFY</button>
				<button className='btn_form_submit' onClick={((e) => isModFunc(e, index, 2))}>CHANGE PASSWORD</button>
			</div>
		</div>);
}
function displayOpenModUser(data, index, roleOptions, modding, setModding, isModFunc, modFunc, newData, setNewData) {
	// Modifying values
	if (modding[1]) {
		let roleList = [undefined, 
						data.roles.includes(roleOptions[0].rName), 
						data.roles.includes(roleOptions[1].rName), 
						data.roles.includes(roleOptions[2].rName)];
		setNewData({
			userID: data.id,
			phone: data.phone,
			email: data.email,
			roleList: roleList
		});
		setModding([modding[0], false]);
	}
	const handleChange = (e) => {
		setNewData({ ...newData, [e.target.name]: e.target.value });
	};
	const handleRoleCheckbox = (e) => {
		newData.roleList[e.target.value] = e.target.checked;
	};
	
	return (
		<div key={data.id} className='row mt-4'>
			<div className="dropdown">
				<div className="item-title">{data.fName} {data.lName}</div>
					<div className='row mt-4'>
						<div className='col-lg-4'>
							<label htmlFor="phone" className='label'>Phone number:</label>
							<input type='text' name='phone' className='input_box_form' value={newData.phone} onChange={handleChange}/>
						</div>
						<div className='col-lg-4'>
							<label htmlFor="email" className='label'>E-mail:</label>
							<input type='text' name='email' className='input_box_form' value={newData.email} onChange={handleChange}/>
						</div>
						
						<div className='col-lg-4'>
						<label htmlFor="" className='label'>Roles:</label><br />
						<div className='checkbox-list'>
							<div name="admin_smjestaja" className="checkbox-div">
								<label htmlFor="admin_smjestaja" className='label'>Administrator smještaja</label>
								<input type="checkbox" name="admin_smjestaja" value="1" onClick={handleRoleCheckbox} defaultChecked={newData.roleList[1]}/>
							</div>
							<div name="admin_prijevoza" className="checkbox-div">
								<label htmlFor="admin_prijevoza" className='label'>Administrator prijevoza</label>
								<input type="checkbox" name="admin_prijevoza" value="2" onClick={handleRoleCheckbox} defaultChecked={newData.roleList[2]}/>
							</div>
							<div name="admin_prijevoza" className="checkbox-div">
								<label htmlFor="smjestajni_admin" className='label'>Korisnicki administrator</label>
								<input type="checkbox" name="admin_prijevoza" value="3" onClick={handleRoleCheckbox} defaultChecked={newData.roleList[3]}/>
							</div>
						</div>
					  </div>
					</div>
					
					<br/>
					<button className='btn_form_confirm_blue' onClick={((e) => modFunc(e, index, newData))}>CONFIRM</button>
					<button className='btn_form_modify_gray' onClick={((e) => isModFunc(e, index, 0))}>CANCEL</button>
			</div>
		</div>);
}
function displayPassModUser(data, index, setModding, isModFunc, newPass, setNewPass, passFunc) {
	const handleChange = (e) => {
		setNewPass(e.target.value);
	};
	return (
		<div key={data.id} className='row mt-4'>
			<div className="dropdown">
				<div className="item-title">{data.fName} {data.lName}</div>
					<label htmlFor="password" className='label'>New password:</label>
					<input type='text' name='password' className='input_box_form' value={newPass} onChange={handleChange}/>
				
				<button className='btn_form_confirm_blue' onClick={((e) => passFunc(e, data.id, newPass))}>CONFIRM</button>
				<button className='btn_form_modify_gray' onClick={((e) => isModFunc(e, index, 0))}>CANCEL</button>
			</div>
		</div>);
}


export default function UserList({users, usersUpdate, page, setPage, roleOptions}) {
	//const [users, setUsers] = useState([]);
	const [isOpen, setIsOpen] = useState(-1);
	const [modding, setModding] = useState([0, 0]);  // 0 -> no, 1 -> password mod
	const [newData, setNewData] = useState({
		userID: -1,
		phone: "",
		email: "",
		roleList: []
	});
	const [newPass, setNewPass] = useState("");
	
	const handleDelete = (e, index) => {
		//console.log("handleDelete ", index);
		deleteUser(users[index].id)
		.catch((error) => {
			console.error("Error deleting user (index ", index, ")");
		})
		.then((result) => {
			setIsOpen(-1);
			usersUpdate();
		});
	};
	const handleModify = (e, index, newData) => {
		// Validate client-side info
		let indsToCheck = []; roleOptions.map((r) => indsToCheck.push(r.id));
		if (ValidatePhone(newData.phone) &&
			ValidateEMail(newData.email) &&
			ValidateCheckArray(newData.roleList, indsToCheck, "Role"))
		{
			modifyUser(newData, roleOptions)
			.catch((error) => {
				console.error("Error modifying user (index ", index, ")", error);
			})
			.then((response) => { usersUpdate(); });
			setModding([0, 0]);
		}
	};
	const handlePassChange = (e, id, str) => {
		console.log(id, "setting pass:", str);
		// Validate client-side info
		if (ValidateString(str, "Password")) 
		{
			changePass(id, str)
			.catch((error) => {
				console.error("Error changing user password (id ", id, ")", error);
			})
			.then((response) => { usersUpdate(); });
			setModding([0, 0]);
		}
	};
	
	const handleOpen = (e, index) => {
		setIsOpen(isOpen == index ? -1 : index);
		setModding([0, 0]);
	};
	const handleIsMod = (e, index, val) => {
		console.log("handleIsMod", index, val);
		if (val == 1) {
			if (modding[0] == 1) {
				setModding([0, 0]);
			}
			else { setModding([1, 1]); }
		}
		else { setModding([val, 1]); }
		console.log(modding);
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
								<h4 className='heading_form'>USERS</h4>
								
								{ users == null ? (<div className='row mt-4'>No users registered.</div>) : (users.length == 0 ? 
									<div className='row mt-4'>Fetching users...</div> : 
									users.map((item, index) => {
										// Check if in page
										if (index < (page[0] * page[2]) || index > ((page[0] * page[2]) + page[2] - 1)) { return null; }
										if (isOpen != index) {
											return displayClosedUser(item, index, handleOpen);
										}
										else {
											switch (modding[0]) {
												case 0:
													return displayOpenUser(item, index, handleOpen, handleDelete, handleIsMod);
												case 1:
													return displayOpenModUser(item, index, roleOptions, modding, setModding, handleIsMod, handleModify, newData, setNewData);
												case 2:
													return displayPassModUser(item, index, setModding, handleIsMod, newPass, setNewPass, handlePassChange);
											}
											if (modding[0] == 0) {
												return displayUser(item, index, page, roleOptions, isOpen, handleOpen, handleDelete, handleIsMod, modding, handleModify, newData, setNewData, setModding);
											}
										}
									})) 
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
