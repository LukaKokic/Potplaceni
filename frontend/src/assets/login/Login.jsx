import React, { useState, useEffect } from "react";
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// To get permissiions
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
};
async function getRoleOptions() {
	let resp = await axios.get('https://expressware.onrender.com/get_roles_info')
	.catch(function (error) {
	  if (error.response != undefined && error.response.status == 404) { console.error("Error 404 getting role options:", error); }
	  else { console.error("Unknown error while getting role options:", error); return []; }
	});
	//console.log("role options resp.data: ", resp);
	return resp.data;
};


async function submitForm(user, pass){
  let resp = await axios.get('https://expressware.onrender.com/login', {
    params: {
      usr: user,
      psswd: pass,
    },
  });
  return resp;
}

export default function Login() {
	const [roleOptions, setRoleOptions] = useState([]);
	useEffect(() => {
		getRoleOptions().then(options => setRoleOptions(options));
	}, []);
	
	const navigate = useNavigate();
	const handleSubmit = (event) => {
		event.preventDefault();
		const dataFromForm = new FormData(event.currentTarget);
		//console.log("input username: ", dataFromForm.get('username'));
		//console.log("input password: ", dataFromForm.get('password'));
		submitForm(dataFromForm.get('username') ,dataFromForm.get('password'))
			.then(response => {
			//console.log("response: ", response);
			var success = response.data['success'];
			/*var userID = response.data['user_id'];
			var username = response.data['username'];
			var msg = response.data['msg'];*/
			if (success){
				let userID = response.data['user_id'];
				// Set logged in user
				getUsers()
				.then((result) => {
					let rolesStr = "";
					result.map((user) => {if (userID == user.id) { rolesStr = user.roles; } });
					let roles = [];
					roleOptions.map((r) => {if (rolesStr.includes(r.rName)) { roles.push(r.id); } });
					localStorage.setItem('user', JSON.stringify({
						id: response.data['user_id'],
						name: response.data['username'],
						roles: roles
					}));
					//console.log("user:", localStorage.getItem("user"));
					navigate('/dashboard');
				});
			}
			else { navigate('/wrong-credentials'); }
		});
	};
	
	return (
		<div className="App">
			<div className="auth-form-container">
				<h1>DentAll</h1>
				<form className="login-form" onSubmit={handleSubmit}>
					<label htmlFor="username">Username</label>
					<input name="username" id="userInput" type="text" placeholder= "Username" lozinka="Username"/>
					<label htmlFor="password">Password</label>
					<input name="password" id="passInput" type="password" placeholder= "********" lozinka="Password"/>
					<button id="loginSubmit">Log in</button>
				</form>
		   </div>
	   </div>
    )
};


export function GetUser() {
	let userJSON = localStorage.getItem("user");
	if (userJSON == "") { 
		console.warn("No user logged in");
		window.location.href = '/'; 
		window.alert("Not logged in!");
		return {id:-1, name:""}; 
	}
	return JSON.parse(userJSON);
};