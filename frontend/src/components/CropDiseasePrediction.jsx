import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import '../styles/CropDiseasePrediction.scss'; // Import the SCSS file
import cropbgImage from '../assets/CropDiseaseImage.png';
import { useLanguage } from '../contexts/LanguageContext';

const CropDiseasePrediction = () => {

  const { languageStrings } = useLanguage();

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State to hold the image preview

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const classNames = [
    'Disease: Grape___healthy',
    'Disease: Corn_(maize)__Northern_Leaf_Blight',
    'Disease: Corn(maize)__Cercospora_leaf_spot Gray_leaf_spot',
    'Disease: Grape___Leaf_blight(Isariopsis_Leaf_Spot)',
    'Disease: Grape___Black_rot',
    'Disease: Corn_(maize)__Common_rust',
    'Disease: Grape___Esca_(Black_Measles)',
    'Disease: Corn_(maize)___healthy',
  ];

  // Function to get the class label from the prediction array
  const getPredictedClass = (predictionObj) => {
    const predictionArray = Object.values(predictionObj); // Convert object to array
    const maxIndex = predictionArray.indexOf(Math.max(...predictionArray));
    return classNames[maxIndex];
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    // Create a preview of the uploaded image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Set the image preview
    };
    reader.readAsDataURL(file);

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://kisaan-konnect.onrender.com/predict-crop-disease', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      setPrediction(data.prediction);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to get prediction');
      setIsLoading(false);
      console.log(err);
    }
  };

  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => handleFileUpload(acceptedFiles[0]),
  });

  return (
    <div className="cropDiseasePrediction_page__prediction-container">
      <img className="cropDiseasePrediction_page__image" src={cropbgImage} alt="Crop Disease" />
      <div className="cropDiseasePrediction_page__heading-text">
        <div className="cropDiseasePrediction_page__heading">{languageStrings.cdp_heading}</div>
        <div className="cropDiseasePrediction_page__one-stop">{languageStrings.cdp_subhead}</div>

        <div className="cropDiseasePrediction_page__dropzone-wrapper">
          <div
            className={`cropDiseasePrediction_page__dropzone ${isDragActive ? 'drag-active' : ''}`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>{languageStrings.cdp_dropzone}</p>
            ) : (
              <p>{languageStrings.cdp_dropzone}</p>
            )}
          </div>

          {/* Show image preview if available */}
          {imagePreview && (
            <div className="cropDiseasePrediction_page__image-preview">
              <h3>{languageStrings.cdp_uploaded}</h3>
              <img src={imagePreview} alt="Uploaded" />
            </div>
          )}

          {isLoading && <p className="cropDiseasePrediction_page__loading-text">{languageStrings.cdp_loading}</p>}
          {error && <p className="cropDiseasePrediction_page__error-text">{error}</p>}
          {prediction && (
            <div className="cropDiseasePrediction_page__result-container">
              <h2>{languageStrings.cdp_predicted}</h2>
              <p className="cropDiseasePrediction_page__prediction-result">{getPredictedClass(prediction)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropDiseasePrediction;