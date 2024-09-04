import HeroImg from "../assets/Herosection.png";
import "../styles/Herosection.scss";

const Herosection = () => {
  return (
    <div>
      <img className="image" src={HeroImg} alt="hero image" />
      <div className="heading-text">
        <div className="manrope-font welcome">Welcome to</div>
        <div className="heading nice-font Heading">Kisaan-Konnect</div>
        <div className="nice-font one-stop">The One Stop Solution</div>
        <div className="welcome">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ipsa, qui assumenda amet nulla soluta!</div>
        <button className="manrope-font about-button">About us</button>
      </div>
    </div>
  );
};

export default Herosection;
