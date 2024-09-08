import { useState, useEffect } from 'react';
import '../styles/FertilizerPrediction.scss'; // Import the SCSS file
import cropbgImage from '../assets/CropDiseaseImage.png';
import { useLanguage } from '../contexts/LanguageContext'; // Import the language context

const soilTypes = ['Sandy', 'Loamy', 'Clay', 'Silty', 'Peaty', 'Chalky'];
const cropTypes = ['Wheat', 'Rice', 'Maize', 'Barley', 'Soybean', 'Cotton'];

const FertilizerPrediction = () => {
  const { languageStrings } = useLanguage(); // Access language strings

  const [formData, setFormData] = useState({
    temperature: '',
    humidity: '',
    moisture: '',
    soilType: '',
    cropType: '',
    nitrogen: '',
    potassium: '',
    phosphorous: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/predict-fertilizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setPrediction(data.prediction);
      setIsLoading(false);
    } catch (err) {
      setError(languageStrings.fp_erro, err); // Error message from language strings
      setIsLoading(false);
    }
  };

  return (
    <div className="prediction-container">
      <img src={cropbgImage} alt={languageStrings.fp_image_alt} className="bg-image" />
      <h1>{languageStrings.fp_heading}</h1>
      <p className='Fert_pred_desc'>{languageStrings.fp_description}</p>
      <form className="fertilizer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{languageStrings.fp_temperature}</label>
          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{languageStrings.fp_humidity}</label>
          <input
            type="number"
            name="humidity"
            value={formData.humidity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{languageStrings.fp_moisture}</label>
          <input
            type="number"
            name="moisture"
            value={formData.moisture}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{languageStrings.fp_soil_type}</label>
          <select
            name="soilType"
            value={formData.soilType}
            onChange={handleInputChange}
            required
          >
            <option value="">{languageStrings.fp_select_soil_type}</option>
            {soilTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>{languageStrings.fp_crop_type}</label>
          <select
            name="cropType"
            value={formData.cropType}
            onChange={handleInputChange}
            required
          >
            <option value="">{languageStrings.fp_select_crop_type}</option>
            {cropTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>{languageStrings.fp_nitrogen}</label>
          <input
            type="number"
            name="nitrogen"
            value={formData.nitrogen}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{languageStrings.fp_potassium}</label>
          <input
            type="number"
            name="potassium"
            value={formData.potassium}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{languageStrings.fp_phosphorous}</label>
          <input
            type="number"
            name="phosphorous"
            value={formData.phosphorous}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          {isLoading ? languageStrings.fp_loading : languageStrings.fp_get_recommendation}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}
      {prediction && (
        <div className="result-container">
          <h2>{languageStrings.fp_recommended}</h2>
          <p className="prediction-result">{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default FertilizerPrediction;