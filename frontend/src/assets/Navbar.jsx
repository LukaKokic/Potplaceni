import React, { useEffect, useState } from 'react';
import logo from './pictures/logo.webp';
import { Link, useNavigate } from 'react-router-dom';
import {GetUser} from "./login/Login"


export default function Navbar() {
	const [user, setUser] = useState({id: -1, name: "", roles: []});
	// Get user
	useEffect(() => {
		setUser(GetUser());
		console.log(user);
	}, []);

	const navigate = useNavigate();
	const logOut = (e) => {
		localStorage.setItem("user", "");
		navigate("/");
	}
  
  return (
    <nav className="navbar navbarEdit navbar-expand-lg">
        <div className="container-fluid">
			<div className="navbar-brand">
				<a href="/dashboard"><img src={logo} className='logo_img' alt='Logo Website'></img></a>
			</div>
			
			<span className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><i className='fa fa-bars bars'></i></span>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav px-3">
					<li className="nav-item">
						<Link to="/dashboard" className="nav-link" id="navHome">Home</Link>
					</li>
					<li className="nav-item">
						<Link to="/dashboard#about" className="nav-link" id="navAbout">About Us</Link>
					</li>
					{ user.roles.includes(1) ? (
						<li className="nav-item">
							<Link to="/accommodation-management" className="nav-link" id="navAcc">Accommodations</Link>
						</li>
						) : null
					}
					{ user.roles.includes(2) ? (
						<li className="nav-item">
							<Link to="/transportation-management" className="nav-link" id="navTrans">Transportation</Link>
						</li>
						) : null
					}
					{ user.roles.includes(1) ? (
						<li className="nav-item">
							<Link to="/user-management" className="nav-link" id="navUsers">Users</Link>
						</li>
						) : null
					}
					{ user.roles.includes(3) ? (
						<li className="nav-item">
							<Link to="/patient-management" className="nav-link" id="navPats">Patients</Link>
						</li>
						) : null
					}
				</ul>
			</div>
			
			<div className='navbar_media'>
				<label className='user_label'>Hello, {user.name}</label>
				<a href='/' className='btn_media_navbar bookNow' id="nav_logOut" onClick={logOut}>Log out</a>
			</div>
		</div>
    </nav>
  );
};
