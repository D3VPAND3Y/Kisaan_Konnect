import '../styles/Header.scss';

const Navbar = ({ heroRef, introRef, servicesRef, carouselRef }) => {
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <button className="logo-btn">Kisaan Konnect</button>
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
          <li onClick={() => scrollToSection(heroRef)}>Home</li>
          <li onClick={() => scrollToSection(introRef)}>About</li>
          <li onClick={() => scrollToSection(servicesRef)}>Services</li>
          <li onClick={() => scrollToSection(carouselRef)}>Awareness</li>
          <li>Market Place</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;