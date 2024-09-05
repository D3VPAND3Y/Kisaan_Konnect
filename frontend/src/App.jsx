import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Home } from './components/marketPlace/Home';
import Navbar from '../src/components/Navbar';

function App() {
  const noFooterRoutes = ['/signin', '/signup', '/forgot-password'];
  const noNavbarRoutes = ['/signin', '/signup', '/forgot-password'];

  return (
    <Router>
      {!noFooterRoutes.includes(window.location.pathname) && <Navbar />}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/market-place" element={<Home />} />
      </Routes>
      {!noNavbarRoutes.includes(window.location.pathname) && <Footer />}
    </Router>
  );
}

export default App;
