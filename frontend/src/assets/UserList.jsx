import React, {useState, useEffect, useRef, Label} from 'react'
import './list.css';
import axios from 'axios';

async function getUsers(){
  let resp = await axios.get('https://expressware.onrender.com/view_admins')
  .then(response => {
	  //console.log("users response: ", response);
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

function displayUser(data, index, isOpen, func) {
	return (
		<div key={data.PIN} className='row mt-4'>
			<div className="dropdown">
				{isOpen ? (<div>
					<button value={index} onClick={((e) => func(e, index))}>
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
					<button className='btn_form_delete_red'>DELETE</button>
				</div>) : (
					<button value={index} onClick={((e) => func(e, index))}>
						{data.lName}, {data.fName}
					</button>)}
			</div>
		</div>
	);
	
	/*return (
		<div key={data.PIN} className='row mt-4'>
			<label>{data.PIN}</label>
			<label>{data.firstname}</label>
			<label>{data.lastname}</label>
			<label>{data.phone}</label>
			<label>{data.email}</label>
			<label>{data.roleList}</label>
		</div>
	);*/
}



export default function UserList() {
	const [users, setUsers] = useState([]);
	const [isOpen, setIsOpen] = useState([]);
	
	useEffect(() => {
		getUsers().then(result => {
			setUsers(result);
			result.map((item, index) => { isOpen[index] = false; });
		});
	}, []);
	
	const handleOpen = (e, index) => {
		const temp = [...isOpen];
		temp[index] = !isOpen[index];
		setIsOpen(temp);
	};
	
	return (
		<div className='form_container_accommodation'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-12 parent_container_content_form'>
						<div className='content_form'>
							<div className='container'>
								<h4 className='heading_form accommodation'>USERS</h4>
								
								{ users.map((item, index) => (displayUser(item, index, isOpen[index], handleOpen))) }
							</div>
						</div>
					</div>
				</div>
			</div>
		 </div>
	);
}