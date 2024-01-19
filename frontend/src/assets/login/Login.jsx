import React, { useState } from "react";
import './Login.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

async function getData(user, pass){
  let resp = await axios.get('https://expressware.onrender.com/login', {
    params: {
      usr: user,
      psswd: pass,
    },
  });
  return resp;
}

export default function Login() {
	const navigate = useNavigate();
	const handleSubmit = (event) => {
		event.preventDefault();
		const dataFromForm = new FormData(event.currentTarget);
		console.log("input username: ", dataFromForm.get('username'));
		console.log("input password: ", dataFromForm.get('password'));
		getData(dataFromForm.get('username') ,dataFromForm.get('password'))
			.then(response => {
			console.log("response: ", response);
			var success = response.data['success'];
			var userID = response.data['user_id'];
			var username = response.data['username'];
			var msg = response.data['msg'];
			console.log("Success: ", success);
			console.log("ID: ", userID);
			console.log("Username: ", username);
			console.log("Message: ", msg);
			if (success){
				navigate('/dashboard');
			}else{
				navigate('/wrong-credentials');
			}
		});
	};
	
	return (
		<div className="App">
			<div className="auth-form-container">
				<h1>DentAll</h1>
				<form className="login-form" onSubmit={handleSubmit}>
					<label for="username">Username</label>
					<input name="username" id="userInput" type="text" placeholder= "Username" lozinka="Username"/>
					<label for="password">Password</label>
					<input name="password" id="passInput" type="password" placeholder= "********" lozinka="Password"/>
					<button id="loginSubmit">Log in</button>
				</form>
		   </div>
	   </div>
    )
};