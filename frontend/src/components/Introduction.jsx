import '../styles/Introduction.scss';
import LargeImage from '../assets/image.png';  // Replace with the actual image path
import SmallImage from '../assets/image.png';  // Replace with the actual image path

const Introduction = () => {
  return (
    <div className="agriculture-section">
      <div className="image-section">
        <img src={LargeImage} alt="Large agriculture scene" className="large-image" />
        <img src={SmallImage} alt="Small agriculture scene" className="small-image" />
      </div>
      <div className="text-section">
        <p className="introduction">About Kisaan Konnect</p>
        <h1 className="title">Empowering Farmers & Promoting Sustainable Agriculture</h1>
        <h2 className="subtitle">Kisaan Konnect is your gateway to modern farming solutions.</h2>
        <p className="description">
          We are committed to connecting farmers with the latest innovations in sustainable farming, organic products, and agricultural support. Whether you're looking to boost productivity, access financial subsidies, or connect with markets, Kisaan Konnect is here to help.
        </p>
        <div className="features">
          <div className="feature">
            <i className="icon basket-icon"></i>
            <p>Cutting-edge AI technology designed to forecast the best path for your future!</p>
          </div>
          <div className="feature">
            <i className="icon tips-icon"></i>
            <p>Stay updated with the latest news and insights shaping the future of agriculture!</p>
          </div>
        </div>
        <ul className="benefits">
          <li>✔ Access to the latest agricultural technologies and market insights.</li>
          <li>✔ Dedicated support for small and large-scale farmers alike.</li>
        </ul>
      </div>
    </div>
  );
};

export default Introduction;