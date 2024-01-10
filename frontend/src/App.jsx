import { Link, Route, Routes } from 'react-router-dom';
import SignIn from './assets/Sign-in template/SignIn';
import Dashboard from './assets/Dashboard';
import BadLogin from './assets/BadLogin';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/wrongCredentials" element={<BadLogin />}/>
      </Routes>
    </div>
  )
}

export default App

