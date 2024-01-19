import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import '../index.css';
import Navbar from "./Navbar";
import Footer from './Footer';
import UserList from "./UserList";
import UserForm from "./UserForm";
import axios from 'axios';


async function getUsers() {
  let resp = await axios.get('https://expressware.onrender.com/view_admins')
  .then(response => {
	  return response.data;
  })
  .catch(function (error) {
	if (error.response != undefined && error.response.status == 404) { console.log("Error 404 getting users:", error); }
	else { console.log("Unknown error while getting users:", error); }
  }); 
  //console.log("users resp: ", resp);
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

export default function UserManagement() {
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
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState([0, -1, 0]);
  
	const [roleOptions, setRoleOptions] = useState([]);

	const usersUpdate = () => {
		getUsers().then(result => {
			//console.log("users update", result);
			setUsers(result);
			let pageSize = 6;
			setPage([page[0], result == null ? 0 : ((result.length % pageSize == 0) ? (result.length / pageSize) : (Math.floor(result.length / pageSize) + 1)), pageSize]);
		});
	};
	useEffect(() => {
		getRoleOptions().then(options => setRoleOptions(options));
		usersUpdate();
	}, []);

	return (
		<div>
		  <Navbar />
		  
		  <UserList users={users} usersUpdate={usersUpdate} page={page} setPage={setPage} roleOptions={roleOptions}/>
		  <UserForm usersUpdate={usersUpdate} roleOptions={roleOptions}/>
		  
		  <Footer />
		</div>
	);
};