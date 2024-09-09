import '../styles/Services.scss';
import agricultureImg from '../assets/cropDisease.jpg';  // Replace with actual image paths
import organicImg from '../assets/crop.jpg';
import vegetablesImg from '../assets/fert.jpg';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';  // Import the LanguageContext

const Services = () => {
  const { languageStrings } = useLanguage();  // Get the language strings from context
  const navigate = useNavigate();

  const services = [
    { 
      image: agricultureImg, 
      title: languageStrings.cropDiseaseTitle, 
      description: languageStrings.cropDiseaseDescription,
      iconClass: 'fa-tractor', 
      path: '/crop-disease-prediction' 
    },
    { 
      image: organicImg, 
      title: languageStrings.whatCropTitle, 
      description: languageStrings.whatCropDescription,
      iconClass: 'fa-seedling', 
      path: '/what-crop-to-grow' 
    },
    { 
      image: vegetablesImg, 
      title: languageStrings.fertilizerPredictionTitle, 
      description: languageStrings.fertilizerPredictionDescription,
      iconClass: 'fa-carrot', 
      path: '/fertilizer-prediction' 
    },
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="services_page__service">
      <div className="services_page__intro">
        <p className="services_page__intro-text">{languageStrings.serviceIntroText}</p>
        <h2 className="services_page__section-title">{languageStrings.whatWeOffer}</h2>
      </div>
      <div className="services_page__cards">
        <div className="services_page__grid-container">
          {services.map((service, index) => (
            <div
              key={index}
              className="services_page__card"
              onClick={() => handleCardClick(service.path)}
              style={{ cursor: 'pointer' }}
            >
              <img src={service.image} alt={service.title} className="services_page__card-image" />
              <div className="services_page__card-content">
                <i className={`fa ${service.iconClass} services_page__card-icon`} aria-hidden="true"></i>
                <h3 className="services_page__card-title">{service.title}</h3>
                <p className="services_page__card-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bullet Points Section */}
      <div className="services_page__benefits-section">
        <ul className="services_page__benefits-list">
          <li><span className="services_page__check-mark">✓</span> {languageStrings.benefitOne1}</li>
          <li><span className="services_page__check-mark">✓</span> {languageStrings.benefitTwo2}</li>
          <li><span className="services_page__check-mark">✓</span> {languageStrings.benefitThree}</li>
          <li><span className="services_page__check-mark">✓</span> {languageStrings.benefitFour}</li>
        </ul>
      </div>
    </div>
  );
};

export default Services;