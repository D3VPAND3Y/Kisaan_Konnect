import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import Footer from './components/Footer'; // Import the Footer component
import '@fortawesome/fontawesome-free/css/all.min.css';
import CropDiseasePrediction from './components/CropDiseasePrediction';
import WhatCropToGrow from './components/WhatCropToGrow';
import FertilizerPrediction from './components/FertilizerPrediction';

function App() {
  const noFooterRoutes = ['/signin', '/signup', '/forgot-password'];

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/crop-disease-prediction" element={<CropDiseasePrediction />} />
        <Route path="/what-crop-to-grow" element={<WhatCropToGrow />} />
        <Route path="/fertilizer-prediction" element={<FertilizerPrediction />} />
      </Routes>
      {!noFooterRoutes.includes(window.location.pathname) && <Footer />}
    </Router>
  );
}

export default App;
