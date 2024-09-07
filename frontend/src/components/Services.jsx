import '../styles/Services.scss';
import agricultureImg from '../assets/image.png';  // Replace with actual image paths
import organicImg from '../assets/image.png';
import vegetablesImg from '../assets/image.png';
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
    <div className="service">
      <div className="intro">
        <p className="intro-text">{languageStrings.serviceIntroText}</p>
        <h2 className="section-title">{languageStrings.whatWeOffer}</h2>
      </div>
      <div className="cards">
        <div className="grid-container">
          {services.map((service, index) => (
            <div
              key={index}
              className="card"
              onClick={() => handleCardClick(service.path)}
              style={{ cursor: 'pointer' }}
            >
              <img src={service.image} alt={service.title} className="card-image" />
              <div className="card-content">
                <i className={`fa ${service.iconClass} card-icon`} aria-hidden="true"></i>
                <h3 className="card-title">{service.title}</h3>
                <p className="card-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bullet Points Section */}
      <div className="benefits-section">
        <ul className="benefits-list">
          <li><span className="check-mark">✓</span> {languageStrings.benefitOne1}</li>
          <li><span className="check-mark">✓</span> {languageStrings.benefitTwo2}</li>
          <li><span className="check-mark">✓</span> {languageStrings.benefitThree}</li>
          <li><span className="check-mark">✓</span> {languageStrings.benefitFour}</li>
        </ul>
      </div>
    </div>
  );
};

export default Services;