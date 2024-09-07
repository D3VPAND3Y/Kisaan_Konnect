import { useState, useEffect } from 'react';
import '../styles/Carousel.scss';
import image from '../assets/image.png';

const newsData = [
  {
    title: 'New Agricultural Reforms Announced',
    description: 'The government has introduced new reforms that aim to support small farmers and boost productivity.',
    image: image,
  },
  {
    title: 'Weather Patterns Affecting Crop Yield',
    description: 'Farmers are urged to adopt more climate-resilient crops as weather patterns become more erratic.',
    image: image,
  },
  {
    title: 'Organic Farming on the Rise',
    description: 'A growing number of farmers are switching to organic farming, leading to increased demand for organic produce.',
    image: image,
  },
  {
    title: 'Farmers Receive New Subsidy',
    description: 'Subsidies have been increased for farmers in rural areas, providing much-needed financial support.',
    image: image,
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % newsData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + newsData.length) % newsData.length);
  };

  // Auto-slide feature using useEffect
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="carousel-section">
      <h1 className="carousel-heading">🌾 Latest News in Agriculture 🌾</h1>
      <div className="carousel">
        <div
          className="carousel-content"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {newsData.map((news, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={news.image} alt={news.title} className="carousel-image" />
              <div className="carousel-text">
                <h2>{news.title}</h2>
                <p>{news.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-btn prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="carousel-btn next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Carousel;