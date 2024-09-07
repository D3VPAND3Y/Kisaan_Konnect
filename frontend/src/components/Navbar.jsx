import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useContext } from 'react';
import '../styles/Header.scss';
import { UserContext } from '../contexts/user.context';

const Navbar = ({ heroRef, introRef, servicesRef, carouselRef }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const sectionToScroll = useRef(null);
  const { user, logout } = useContext(UserContext); // Get the user and logout function from context

  useEffect(() => {
    if (location.pathname === '/dashboard' && sectionToScroll.current) {
      scrollToSection(sectionToScroll.current);
      sectionToScroll.current = null;
    }
  }, [location]);

  const scrollToSection = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMarketPlaceClick = () => {
    navigate('/market-place');
  };

  const handleHomeClick = () => {
    navigate('/dashboard');
  };

  const handleAboutClick = () => {
    if (location.pathname !== '/dashboard') {
      sectionToScroll.current = introRef;
      navigate('/dashboard');
    } else {
      scrollToSection(introRef);
    }
  };

  const handleServicesClick = () => {
    if (location.pathname !== '/dashboard') {
      sectionToScroll.current = servicesRef;
      navigate('/dashboard');
    } else {
      scrollToSection(servicesRef);
    }
  };

  const handleAwarenessClick = () => {
    if (location.pathname !== '/dashboard') {
      sectionToScroll.current = carouselRef;
      navigate('/dashboard');
    } else {
      scrollToSection(carouselRef);
    }
  };

  const handleLogout = () => {
    logout(); // Call the logout function to clear user data and token
    navigate('/signin'); // Navigate to the login page
  };

  const handleLogin = () => {
    navigate('/signin'); // Navigate to the login page
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <button className="logo-btn" onClick={handleHomeClick}>
            Kisaan Konnect
          </button>
        </div>
        <div className="contact-info">
          <div className="contact">
            <i className="fas fa-phone"></i>
            <span>Contact us: 911</span>
          </div>
          <div className="email">
            <i className="fas fa-envelope"></i>
            <span>hehe@gmail.com</span>
          </div>
        </div>
        <div className="actions">
          {/* Conditionally render login/logout button based on the user context */}
          {user ? (
            <button className="logout-btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="login-btn" onClick={handleLogin}>
              LOGIN
            </button>
          )}
          <div className="language-toggle">
            <span>English</span>
            <input type="checkbox" id="language-switch" />
            <label htmlFor="language-switch">हिंदी</label>
          </div>
        </div>
      </div>
      <nav className="navbar">
        <ul>
          <li
            className={isActive('/dashboard') ? 'active' : ''}
            onClick={handleHomeClick}
          >
            Home
          </li>
          <li className="Navbar__about" onClick={handleAboutClick}>
            About
          </li>
          <li className="Navbar__services" onClick={handleServicesClick}>
            Services
          </li>
          <li className="Navbar__Awareness" onClick={handleAwarenessClick}>
            Awareness
          </li>
          <li
            className={isActive('/market-place') ? 'active' : ''}
            onClick={handleMarketPlaceClick}
          >
            Market Place
          </li>
        </ul>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  heroRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  introRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  servicesRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  carouselRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

export default Navbar;
