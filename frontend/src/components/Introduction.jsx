import '../styles/Introduction.scss';
import LargeImage from '../assets/image.png';  // Replace with the actual image path
import SmallImage from '../assets/image.png';  // Replace with the actual image path
import { useLanguage } from '../contexts/LanguageContext';  // Import the LanguageContext

const Introduction = () => {
  const { languageStrings } = useLanguage();  // Get the language strings from context

  return (
    <div className="agriculture-section">
      <div className="image-section">
        <img src={LargeImage} alt={languageStrings.largeImageAlt} className="large-image" />
        <img src={SmallImage} alt={languageStrings.smallImageAlt} className="small-image" />
      </div>
      <div className="text-section">
        <p className="introduction">{languageStrings.introductionTitle}</p>
        <h1 className="title">{languageStrings.introductionMainTitle}</h1>
        <h2 className="subtitle">{languageStrings.introductionSubtitle}</h2>
        <p className="description">
          {languageStrings.introductionDescription}
        </p>
        <div className="features">
          <div className="feature">
            <i className="icon basket-icon"></i>
            <p>{languageStrings.featureOne}</p>
          </div>
          <div className="feature">
            <i className="icon tips-icon"></i>
            <p>{languageStrings.featureTwo}</p>
          </div>
        </div>
        <ul className="benefits">
          <li>{languageStrings.benefitOne}</li>
          <li>{languageStrings.benefitTwo}</li>
        </ul>
      </div>
    </div>
  );
};

export default Introduction;