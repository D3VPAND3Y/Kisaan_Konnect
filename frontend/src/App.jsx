import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CropDiseasePrediction from './components/CropDiseasePrediction';
import WhatCropToGrow from './components/WhatCropToGrow';
import FertilizerPrediction from './components/FertilizerPrediction';
import { Home } from './components/marketPlace/Home';
import Navbar from '../src/components/Navbar';
import { useRef } from 'react';
import Checkout from './components/marketPlace/Checkout';

function Layout({ children }) {
  const location = useLocation();

  const noFooterRoutes = ['/signin', '/signup', '/forgot-password'];
  const noNavbarRoutes = ['/signin', '/signup', '/forgot-password'];

  const introRef = useRef(null);
  const servicesRef = useRef(null);
  const carouselRef = useRef(null);

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && (
        <Navbar introRef={introRef} servicesRef={servicesRef} carouselRef={carouselRef} />
      )}
      {children}
      {!noFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/crop-disease-prediction" element={<CropDiseasePrediction />} />
          <Route path="/what-crop-to-grow" element={<WhatCropToGrow />} />
          <Route path="/fertilizer-prediction" element={<FertilizerPrediction />} />
          <Route path="/market-place" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
