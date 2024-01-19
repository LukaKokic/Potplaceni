import { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './assets/login/Login';
import Dashboard from './assets/Dashboard';
import BadLogin from './assets/login/BadLogin';
import AccommodationManagement from './assets/AccommodationManagement';
import TransportationManagement from './assets/TransportationManagement';
import VehicleManagement from './assets/VehicleManagement';
import PatientManagement from './assets/PatientManagement';
import UserManagement from './assets/UserManagement';

export default function App() {
  const { pathname, hash, key } = useLocation();
  
  /*const { user, setUser } = useState(undefined);
  // Check if user logged in
  const navigate = useNavigate();
  useEffect(() => {
	let userJSON = localStorage.getItem("user");
	if (userJSON == "") {
		console.log("Not logged in!"); 
		navigate("/"); 
	}
	console.log("YOO");
  }, []);*/

  // Scroll to hash functionality
  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === '') {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]); // do this on route change
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wrong-credentials" element={<BadLogin />} />
        <Route path="/accommodation-management" element={<AccommodationManagement />} />
        <Route path="/transportation-management" element={<TransportationManagement />} />
		<Route path="/vehicle-management/:transID" element={<VehicleManagement />} />
		<Route path="/user-management" element={<UserManagement />} />
        <Route path="/patient-management" element={<PatientManagement />} />
      </Routes>
    </div>
  )
};
