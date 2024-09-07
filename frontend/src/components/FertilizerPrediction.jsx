import { useState, useEffect } from 'react';
import '../styles/FertilizerPrediction.scss'; // Import the SCSS file
import cropbgImage from '../assets/CropDiseaseImage.png';



const soilTypes = ['Sandy', 'Loamy', 'Clay', 'Silty', 'Peaty', 'Chalky'];
const cropTypes = ['Wheat', 'Rice', 'Maize', 'Barley', 'Soybean', 'Cotton'];

const FertilizerPrediction = () => {
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
      setError('Failed to get prediction: ', err);
      setIsLoading(false);
    }
  };

  return (
    <div className="prediction-container">
      <img src={cropbgImage} alt="Crop Disease Prediction" className="bg-image" />
      <h1>Fertilizer Prediction</h1>
      <p className='Fert_pred_desc'>Fill in the details to get fertilizer recommendations</p>
      <form className="fertilizer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Temperature (°C)</label>
          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Humidity (%)</label>
          <input
            type="number"
            name="humidity"
            value={formData.humidity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Moisture (%)</label>
          <input
            type="number"
            name="moisture"
            value={formData.moisture}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Soil Type</label>
          <select
            name="soilType"
            value={formData.soilType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Soil Type</option>
            {soilTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Crop Type</label>
          <select
            name="cropType"
            value={formData.cropType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Crop Type</option>
            {cropTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Nitrogen Content (mg/kg)</label>
          <input
            type="number"
            name="nitrogen"
            value={formData.nitrogen}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Potassium Content (mg/kg)</label>
          <input
            type="number"
            name="potassium"
            value={formData.potassium}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phosphorous Content (mg/kg)</label>
          <input
            type="number"
            name="phosphorous"
            value={formData.phosphorous}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Get Fertilizer Recommendation
        </button>
      </form>

      {isLoading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {prediction && (
        <div className="result-container">
          <h2>Recommended Fertilizer:</h2>
          <p className="prediction-result">{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default FertilizerPrediction;