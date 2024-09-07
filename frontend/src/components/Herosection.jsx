import HeroImg from "../assets/Herosection.png";
import "../styles/Herosection.scss";
import { useLanguage } from "../contexts/LanguageContext";

const Herosection = ({introRef}) => {

  const { languageStrings } = useLanguage();

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hero-section">
      <img className="hero-section__image" src={HeroImg} alt="hero image" />
      <div className="hero-section__heading-text">
        <div className="hero-section__welcome">{languageStrings.welcome}</div>
        <div className="hero-section__heading">{languageStrings.logo}</div>
        <div className="hero-section__one-stop">{languageStrings.onestop}</div>
        <div className="hero-section__description">
          {languageStrings.herodescription}
        </div>
        <button onClick={() => scrollToSection(introRef)} className="hero-section__about-button">{languageStrings.about}</button>
      </div>
    </div>
  );
};

export default Herosection;
