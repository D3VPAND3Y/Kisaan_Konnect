import '../styles/Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <button className="logo-btn">Kisaan Konnect</button>
        </div>
        <div className="contact-info">
          <div className="contact">
            <FontAwesomeIcon icon={faPhone} />
            <span>Contact us: 911</span>
          </div>
          <div className="email">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>hehe@gmail.com</span>
          </div>
        </div>
        <div className="actions">
          <button className="login-btn">LOGIN</button>
          <div className="language-toggle">
            <span>English</span>
            <input type="checkbox" id="language-switch" />
            <label htmlFor="language-switch">हिंदी</label>
          </div>
        </div>
      </div>
      <nav className="navbar">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Awareness</li>
          <li>Market Place</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;