import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.scss';
import { useLanguage } from '../contexts/LanguageContext'; // Import the language context
import { useRef, useEffect } from 'react';

const Navbar = ({ heroRef, introRef, servicesRef, carouselRef }) => {
  const { language, toggleLanguage, languageStrings } = useLanguage(); // Use language context
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const sectionToScroll = useRef(null);

   // Scroll to the section after navigation
   useEffect(() => {
    if (location.pathname === '/dashboard' && sectionToScroll.current) {
      scrollToSection(sectionToScroll.current);
      sectionToScroll.current = null; // Reset after scrolling
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
  }

  const handleServicesClick = () => {
    if (location.pathname !== '/dashboard') {
      sectionToScroll.current = servicesRef;
      navigate('/dashboard');
    } else {
      scrollToSection(servicesRef);
    }
  }

  const handleAwarenessClick = () => {
    if (location.pathname !== '/dashboard') {
      sectionToScroll.current = carouselRef;
      navigate('/dashboard');
    } else {
      scrollToSection(carouselRef);
    }
  }

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <button className="logo-btn">{languageStrings.logo}</button>
        </div>
        <div className="contact-info">
          <div className="contact">
            <i className="fas fa-phone"></i>
            <span>{languageStrings.contactUs}: 9943-455-644</span>
          </div>
          <div className="email">
            <i className="fas fa-envelope"></i>
            <span>{languageStrings.email}</span>
          </div>
        </div>
        <div className="actions">
          <button className="login-btn">{languageStrings.login}</button>
          <div className="language-toggle">
            <span>{languageStrings.english}</span>
            <input
              type="checkbox"
              id="language-switch"
              onChange={toggleLanguage}
              checked={language === 'hi'}
            />
            <label htmlFor="language-switch">{languageStrings.hindi}</label>
          </div>
        </div>
      </div>
      <nav className="navbar">
        <ul>
          <li className={isActive('/dashboard') ? 'active' : ''} onClick={handleHomeClick}>
            {languageStrings.home}
          </li>
          <li onClick={handleAboutClick}>{languageStrings.about}</li>
          <li onClick={handleServicesClick}>{languageStrings.services}</li>
          <li onClick={handleAwarenessClick}>{languageStrings.awareness}</li>
          <li className={isActive('/market-place') ? 'active' : ''} onClick={handleMarketPlaceClick}>
            {languageStrings.marketPlace}
          </li>
        </ul>
      </nav>
    </header>
  );
};

// Define prop types for validation
Navbar.propTypes = {
  heroRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  introRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  servicesRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  carouselRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
};

export default Navbar;