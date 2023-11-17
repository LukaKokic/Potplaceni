import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './assets/Sign-in template/SignIn';
import Dashboard from './assets/Dashboard';
import BadLogin from './assets/BadLogin';

function App() {
  return (
    <div className="bg-slate-100">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/wrongCredentials" element={<BadLogin />}/>
      </Routes>
    </div>
  )
}

export default App
