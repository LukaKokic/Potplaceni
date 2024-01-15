import { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Login from './assets/login/Login';
import Dashboard from './assets/Dashboard';
import BadLogin from './assets/login/BadLogin';
import AccommodationManagement from './assets/AccommodationManagement';
import TransportationForm from './assets/TransportationForm';
import AddPatient from './assets/AddPatient';
import UserManagement from './assets/UserManagement';

function App() {
  const { pathname, hash, key } = useLocation();

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
        <Route path="/transporation-form" element={<TransportationForm />} />
		<Route path="/user-management" element={<UserManagement />} />
        <Route path="/add-patient" element={<AddPatient />} />
      </Routes>
    </div>
  )
}

export default App;
