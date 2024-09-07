import HeroImg from "../assets/Herosection.png";
import "../styles/Herosection.scss";

const Herosection = ({introRef}) => {

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hero-section">
      <img className="hero-section__image" src={HeroImg} alt="hero image" />
      <div className="hero-section__heading-text">
        <div className="hero-section__welcome">Welcome to</div>
        <div className="hero-section__heading">Kisaan-Konnect</div>
        <div className="hero-section__one-stop">The One Stop Solution</div>
        <div className="hero-section__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ipsa, qui assumenda amet nulla soluta!
        </div>
        <button onClick={() => scrollToSection(introRef)} className="hero-section__about-button">About us</button>
      </div>
    </div>
  );
};

export default Herosection;
