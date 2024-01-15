import React, {useState, useEffect, Label} from 'react'
import '../index.css';
import axios from 'axios';

async function getUsers(){
  let resp = await axios.get('https://expressware.onrender.com/view_admins')
  .then(response => {
	  console.log("users response: ", resp);
	  users = resp;
  })
  .catch(function (error) {
	if (error.response.status == 404) { console.log("Error 404 getting users:", error); }
	else { console.log("Unknown error while getting users:", error); }
	return [
	  { PIN: 1, firstname: "Pero", lastname: "Peric", phone: "0981112222", email: "pero@peric.com", roleList: 0 },
	  { PIN: 2, firstname: "Ivan", lastname: "Ivanic", phone: "0981112222", email: "ivan@ivanic.com", roleList: 0 }
	];
  }); 
  return resp;
}

async function createRows(users) {
	const rows = [];
	for (let i = 0; i < users.length; i++) {
		rows.push(
			<div className='row mt-4'>
				<label>{users[i].PIN}</label>
				<label>{users[i].firstname}</label>
				<label>{users[i].lastname}</label>
				<label>{users[i].phone}</label>
				<label>{users[i].email}</label>
				<label>{users[i].roleList}</label>
			</div>
		);
	}
	return rows;
}




export default function UserList() {
	const [users, setUsers] = useState([]);
	const [rows, setRows] = useState([]);
	
	useEffect(() => {
		// Pozovi funkcije za dohvaćanje opcija iz baze i postavi ih u state
		getUsers().then(result => {
			setUsers(result);
			createRows(result).then(result => setRows(result));
		});
	}, []);
	console.log("users: ", users);
	console.log("rows: ", rows);
	return (
		<div className='form_container_accommodation'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-12 parent_container_content_form'>
						<div className='content_form'>
							<div className='container'>
								<h4 className='heading_form accommodation'>USERS</h4>
								
								{ rows }
							</div>
						</div>
					</div>
				</div>
			</div>
		 </div>
	);
}