import '../styles/Footer.css';
import Logo from '../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';  // Import useLanguage context

const Footer = ({ introRef, servicesRef, carouselRef }) => {
  const navigate = useNavigate();
  const location = useLocation();  // Get current route
  const sectionToScroll = useRef(null);  // Store the section to scroll to after navigation

  const { languageStrings } = useLanguage();  // Get current language and strings

  // Scroll to the section after navigation
  useEffect(() => {
    if (location.pathname === '/dashboard' && sectionToScroll.current) {
      scrollToSection(sectionToScroll.current);
      sectionToScroll.current = null;  // Reset after scrolling
    }
  }, [location]);

  const scrollToSection = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
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

  const handleNewsClick = () => {
    if (location.pathname !== '/dashboard') {
      sectionToScroll.current = carouselRef;
      navigate('/dashboard');
    } else {
      scrollToSection(carouselRef);
    }
  };

  // Get the footer strings based on the current language

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <img src={Logo} alt="Logo" className="footer-logo" />
          <p>{languageStrings.footer_about_text}</p>
        </div>

        <div className="footer-section explore">
          <h3>{languageStrings.footer_explore_heading}</h3>
          <ul>
            <li><a onClick={handleAboutClick}>{languageStrings.footer_about_us}</a></li>
            <li><a onClick={handleServicesClick}>{languageStrings.footer_our_services}</a></li>
            <li><a onClick={handleNewsClick}>{languageStrings.footer_latest_news}</a></li>
            <li><a href="/market-place">{languageStrings.footer_market_place}</a></li>
          </ul>
        </div>

        <div className="footer-section news">
          <h3>{languageStrings.footer_recent_news_heading}</h3>
          <ul>
            <li><a href="#">{languageStrings.footer_recent_news1}</a><span>Aug 24, 2024</span></li>
            <li><a href="#">{languageStrings.footer_recent_news2}</a><span>Aug 22, 2024</span></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>{languageStrings.footer_contact_heading}</h3>
          <ul>
            <li><i className="fas fa-phone-alt"></i> {languageStrings.footer_phone}</li>
            <li><i className="fas fa-envelope"></i> {languageStrings.footer_email}</li>
            <li><i className="fas fa-map-marker-alt"></i> {languageStrings.footer_address}</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Kisaan Konnect. {languageStrings.footer_rights_reserved}</p>
        <p><a href="https://github.com/D3VPAND3Y/Kisaan_Konnect/graphs/contributors">{languageStrings.footer_developers}</a> | <a href="https://github.com/D3VPAND3Y/Kisaan_Konnect" target='_blank'>{languageStrings.footer_github}</a></p>
      </div>
    </footer>
  );
};

export default Footer;