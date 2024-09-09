import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useContext } from 'react';
import '../styles/Header.scss';
import { UserContext } from '../contexts/user.context';
import { useLanguage } from '../contexts/LanguageContext'; // Import the language context

const Navbar = ({ heroRef, introRef, servicesRef, carouselRef }) => {
  const { language, toggleLanguage, languageStrings } = useLanguage(); // Use language context
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
      const offset = -135; // Adjust this value as needed for more/less offset
      const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleMarketPlaceClick = () => {
    navigate('/market-place');
  };

  const handleHomeClick = () => {
    if (location.pathname !== '/dashboard') {
      sectionToScroll.current = heroRef;
      navigate('/dashboard');
    } else {
      scrollToSection(heroRef);
    }
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
    navigate('/awareness');
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
          <button onClick={handleHomeClick} className="logo-btn">{languageStrings.logo}</button>
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