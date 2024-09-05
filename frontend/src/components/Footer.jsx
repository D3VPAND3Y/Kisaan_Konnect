import '../styles/Footer.css';
import Logo from '../assets/logo.png'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <img src={Logo} alt="Logo" className="footer-logo" />
          <p>
            There are many variations of passages of lorem ipsum available, but
            the majority suffered.
          </p>
          <div className="footer-socials">
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-pinterest"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        <div className="footer-section explore">
          <h3>Explore</h3>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Our Projects</a></li>
            <li><a href="#">Meet the Farmers</a></li>
            <li><a href="#">Latest News</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section news">
          <h3>News</h3>
          <ul>
            <li><a href="#">Bringing Food Production Back To Cities</a><span>July 5, 2022</span></li>
            <li><a href="#">The Future of Farming, Smart Irrigation Solutions</a><span>July 5, 2022</span></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact</h3>
          <ul>
            <li><i className="fas fa-phone-alt"></i> 666 888 0000</li>
            <li><i className="fas fa-envelope"></i> needhelp@company.com</li>
            <li><i className="fas fa-map-marker-alt"></i> 80 brooklyn golden street line New York, USA</li>
          </ul>
          <div className="footer-newsletter">
            <input type="email" placeholder="Your Email Address" />
            <button><i className="fas fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; All Copyright 2024 by shawonetc Themes</p>
        <p><a href="#">Terms of Use</a> | <a href="#">Privacy Policy</a></p>
      </div>
    </footer>
  );
};

export default Footer;
