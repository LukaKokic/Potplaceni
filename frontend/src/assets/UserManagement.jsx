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
	return [
	  { PIN: 1, firstname: "Pero", lastname: "Peric", phone: "0981112222", email: "pero@peric.com", roles: [0] },
	  { PIN: 2, firstname: "Ivan", lastname: "Ivanic", phone: "0981112222", email: "ivan@ivanic.com", roles: [0] }
	];
  }); 
  console.log("users resp: ", resp);
  return resp;
}

async function getRoleOptions() {
	let resp = await axios.get('https://expressware.onrender.com/get_roles_info')
	.catch(function (error) {
	  if (error.response.status == 404) { console.error("Error 404 getting role options:", error); }
	  else { console.error("Unknown error while getting role options:", error); }
	  return [
        { id: 1, rName: 'ERROR GETTING ROLES' }
      ];
	});
	//console.log("role options resp.data: ", resp);
	return resp.data;
  };

const UserManagement = () => {
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
}

export default UserManagement;