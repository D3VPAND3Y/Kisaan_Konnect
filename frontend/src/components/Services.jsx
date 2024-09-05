import '../styles/Services.scss';
import agricultureImg from '../assets/image.png';  // Replace with actual image paths
import organicImg from '../assets/image.png';
import vegetablesImg from '../assets/image.png';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    { 
      image: agricultureImg, 
      title: 'Crop Disease Prediction', 
      description: 'Predict potential crop diseases early to prevent crop loss and increase yield.',
      iconClass: 'fa-tractor', 
      path: '/crop-disease-prediction' 
    },
    { 
      image: organicImg, 
      title: 'What Crop to Grow', 
      description: 'Get recommendations on the best crops to grow based on soil, weather, and market demand.',
      iconClass: 'fa-seedling', 
      path: '/what-crop-to-grow' 
    },
    { 
      image: vegetablesImg, 
      title: 'Fertilizer Prediction', 
      description: 'Receive personalized fertilizer recommendations to optimize crop growth and reduce costs.',
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
        <p className="intro-text">Our Services</p>
        <h2 className="section-title">What We Offer</h2>
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
          <li><span className="check-mark">✓</span> Increased efficiency in farming practices</li>
          <li><span className="check-mark">✓</span> Data-driven decisions to enhance yield</li>
          <li><span className="check-mark">✓</span> Personalized recommendations tailored to your needs</li>
          <li><span className="check-mark">✓</span> Cost-effective solutions to reduce waste and optimize resources</li>
        </ul>
      </div>
    </div>
  );
};

export default Services;