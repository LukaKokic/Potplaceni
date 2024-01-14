import { Link, Route, Routes } from 'react-router-dom';
import Login from './assets/login/Login';
import Dashboard from './assets/Dashboard';
import BadLogin from './assets/login/BadLogin';
import AccommodationManagement from './assets/AccommodationManagement';
import TransportationForm from './assets/TransportationForm';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wrong-credentials" element={<BadLogin />} />
        <Route path="/accommodation-management" element={<AccommodationManagement />} />
        <Route path="/transporation-form" element={<TransportationForm />} />
      </Routes>
    </div>
  )
}

export default App;
