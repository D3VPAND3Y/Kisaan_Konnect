import '../styles/Introduction.scss';
import { useLanguage } from '../contexts/LanguageContext';  // Import the LanguageContext
import introImg1 from '../assets/IntroImage1.jpg';
import introImg2 from '../assets/IntroImage2.jpg';

const Introduction = () => {
  const { languageStrings } = useLanguage();  // Get the language strings from context

  return (
    <div className="introduction_page__agriculture-section">
      <div className="introduction_page__image-section">
        <img src={introImg2} alt={languageStrings.largeImageAlt} className="introduction_page__large-image" />
        <img src={introImg1} alt={languageStrings.smallImageAlt} className="introduction_page__small-image" />
      </div>
      <div className="introduction_page__text-section">
        <p className="introduction_page__introduction">{languageStrings.introductionTitle}</p>
        <h1 className="introduction_page__title">{languageStrings.introductionMainTitle}</h1>
        <h2 className="introduction_page__subtitle">{languageStrings.introductionSubtitle}</h2>
        <p className="introduction_page__description">
          {languageStrings.introductionDescription}
        </p>
        <div className="introduction_page__features">
          <div className="introduction_page__feature">
            <i className="introduction_page__icon basket-icon"></i>
            <p>{languageStrings.featureOne}</p>
          </div>
          <div className="introduction_page__feature">
            <i className="introduction_page__icon tips-icon"></i>
            <p>{languageStrings.featureTwo}</p>
          </div>
        </div>
        <ul className="introduction_page__benefits">
          <li>{languageStrings.benefitOne}</li>
          <li>{languageStrings.benefitTwo}</li>
        </ul>
      </div>
    </div>
  );
};

export default Introduction;