import { Link, Route, Routes } from 'react-router-dom';
import SignIn from './assets/Sign-in template/SignIn';
import Dashboard from './assets/Dashboard';
import BadLogin from './assets/BadLogin';
import AccommodationManagement from './assets/AccommodationManagement';
import TransportationForm from './assets/TransportationForm';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wrongCredentials" element={<BadLogin />} />
        <Route path="/accommodation-management" element={<AccommodationManagement />} />
        <Route path="/transporation-form" element={<TransportationForm />} />
      </Routes>
    </div>
  )
}

export default App;
