import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
