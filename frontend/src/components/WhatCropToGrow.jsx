import { useState, useEffect } from 'react';
import '../styles/CropPrediction.scss';
import cropbgImage from '../assets/CropDiseaseImage.png';

const WhatCropToGrow = () => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorous: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/predict-crop', {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="prediction-container">
      <img src={cropbgImage} alt="Crop Disease Prediction" className="bg-image" />
      <h1>What Crop to Grow</h1>
      <div className="description">
      Fill in the details to get Crop recommendations
      </div>
      <form onSubmit={handleSubmit} className="crop-form">
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="nitrogen">Nitrogen (N)</label>
            <input
              type="number"
              id="nitrogen"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="phosphorous">Phosphorous (P)</label>
            <input
              type="number"
              id="phosphorous"
              name="phosphorous"
              value={formData.phosphorous}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="potassium">Potassium (K)</label>
            <input
              type="number"
              id="potassium"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="temperature">Temperature (°C)</label>
            <input
              type="number"
              id="temperature"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="humidity">Humidity (%)</label>
            <input
              type="number"
              id="humidity"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="ph">pH Level</label>
            <input
              type="number"
              step="0.1"
              id="ph"
              name="ph"
              value={formData.ph}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="rainfall">Rainfall (mm)</label>
            <input
              type="number"
              id="rainfall"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          {isLoading ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}
      {prediction && (
        <div className="result-container">
          <h2>Recommended Crop:</h2>
          <p className="prediction-result">{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default WhatCropToGrow;